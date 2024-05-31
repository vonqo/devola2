const cloud = function(sketch) {

    const energyRange = {
        low: 100,
        high: 255
    };

    let font;
    let pg;
    let gl;
    let cloud;
    let fft;
    let input;
    let zoom = 0.5;

    let ww;
    let hh;

    let speed = 5.0;

    const textTop = 50;
    const textLeft = 150;
    const even_tide_text = "  ________      ________ _   _   _______ _____ _____  ______ \n |  ____\\ \\    / /  ____| \\ | | |__   __|_   _|  __ \\|  ____|\n | |__   \\ \\  / /| |__  |  \\| |    | |    | | | |  | | |__   \n |  __|   \\ \\/ / |  __| | . ` |    | |    | | | |  | |  __|  \n | |____   \\  /  | |____| |\\  |    | |   _| |_| |__| | |____ \n |______|   \\/   |______|_| \\_|    |_|  |_____|_____/|______|\n                                                             \n                                                             ";

    // ============================================================== //
    sketch.preload = function() {
        cloud = sketch.loadShader('et_cloud/cloud.vert', 'et_cloud/cloud.frag');
        font = sketch.loadFont('../../assets/font/JetBrainsMono/JetBrainsMono-Medium.ttf');
        
        ww = localStorage.getItem('reso_width');
        hh = localStorage.getItem('reso_height');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh), sketch.WEBGL);
        pg = sketch.createGraphics(ww, hh, sketch.WEBGL);

        sketch.textFont(font);
        sketch.textAlign(sketch.LEFT, sketch.TOP);

        input = new p5.AudioIn();
        input.start();
        fft = new p5.FFT(0.5, 256);
        fft.setInput(input);

        gl = this.canvas.getContext('webgl');
        gl.disable(gl.DEPTH_TEST);

        pg.shader(cloud);
    }

    // ============================================================== //
    sketch.draw = function() {
        sketch.translate(-sketch.width/2,-sketch.height/2,0);1

        let spectrum = fft.analyze();
        let energy = fft.getEnergy(energyRange.low, energyRange.high);
        let amp = sketch.map(energy, energyRange.low, energyRange.high, 0.4, 0.7, true);
        let speed = sketch.map(energy, energyRange.low, energyRange.high, 8, 8, true);
        let rotation = sketch.map(energy, energyRange.low, energyRange.high, 0.4, 0.50, true);
        
        if(sketch.keyIsDown(sketch.UP_ARROW)) {
            if(zoom < 2.5) {
                zoom += 0.01;
            }
        } if(sketch.keyIsDown(sketch.DOWN_ARROW)) {
            if(zoom > 0.5) {
                zoom -= 0.01;
            }
        } 

        cloud.setUniform("iResolution", [sketch.width, sketch.height]); //pass some values to the shader
        cloud.setUniform("iTime", sketch.millis() * 0.001);
        cloud.setUniform("amp", sketch.lerp(0.4, amp, 0.05));
        cloud.setUniform("speed", speed);
        cloud.setUniform("rot", sketch.lerp(0.4, rotation, 0.05));
        cloud.setUniform("zoom", zoom);

        // sketch.text('PIZDA');

        pg.shader(cloud);
        pg.box(pg.width, pg.height, 0);
        sketch.image(pg, 0, 0);

        // --------------------------------------------------------- //
        let bass = fft.getEnergy("bass");
        let lowMid = fft.getEnergy("lowMid");
        let mid = fft.getEnergy("mid");
        let highMid = fft.getEnergy("highMid");
        let treble = fft.getEnergy("treble");

        let colorBass = sketch.map(bass, 20, 255, 5, 200);
        let colorLowMid = sketch.map(lowMid, 20, 255, 5, 200);
        let colorMid = sketch.map(mid, 20, 255, 5, 200);
        let colorHighMid = sketch.map(highMid, 20, 255, 5, 200);
        let colorTreble = sketch.map(treble, 20, 255, 5, 200);

        sketch.textSize(24);
        sketch.fill(255, 255, 255, colorBass);
        sketch.text(even_tide_text, textLeft, textTop);
        
        sketch.textSize(24);
        sketch.fill(255, 255, 255, colorLowMid);
        sketch.text(`
 | bass     | low_mid  | mid      | high_mid | treble   |
 |----------|----------|----------|----------|----------|
 | ${fixedPoint(bass)} | ${fixedPoint(lowMid)} | ${fixedPoint(mid)} | ${fixedPoint(highMid)} | ${fixedPoint(treble)} |
        `, textLeft, textTop + 230);

        sketch.textSize(24);
        sketch.fill(255, 255, 255, colorMid);
        sketch.text(`
 0x00 0x00 0x00 0x00 0x00 0x54 0x73 0x65 0x74 0x73 0x65 0x6e

 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x4e 0x78

 0x00 0x42 0x6f 0x6f 0x67 0x69 0x65 0x6c 0x65 0x76 0x65 0x6e

 0x41 0x6d 0x61 0x72 0x74 0x75 0x76 0x73 0x63 0x68 0x69 0x6e

 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x56 0x6f 0x6e 0x71 0x6f
        `, textLeft, textTop + 370);
    }

    function fixedPoint(a) {
        let tmp = a.toFixed(2);
        tmp = String(tmp);
        for(let i = tmp.length; i < 8; i ++) {
            tmp = "0" + tmp;
        }

        return tmp;
    }

    // ============================================================== //
    sketch.keyTyped = function() {

    }
}




                                                            