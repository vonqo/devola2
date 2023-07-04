const cloud = function(sketch) {

    const energyRange = {
        low: 150,
        high: 280
    };

    let font;
    let pg;
    let gl;
    let cloud;
    let fft;
    let input;

    let ww;
    let hh;

    const textTop = 50;
    const textLeft = 150;
    const even_tide_text = "  ________      ________ _   _   _______ _____ _____  ______ \n |  ____\\ \\    / /  ____| \\ | | |__   __|_   _|  __ \\|  ____|\n | |__   \\ \\  / /| |__  |  \\| |    | |    | | | |  | | |__   \n |  __|   \\ \\/ / |  __| | . ` |    | |    | | | |  | |  __|  \n | |____   \\  /  | |____| |\\  |    | |   _| |_| |__| | |____ \n |______|   \\/   |______|_| \\_|    |_|  |_____|_____/|______|\n                                                             \n                                                             ";

    // ============================================================== //
    sketch.preload = function() {
        cloud = sketch.loadShader('scenes/cloud/cloud.vert', 'scenes/cloud/cloud.frag');
        font = sketch.loadFont('../../assets/font/JetBrainsMono/JetBrainsMono-Medium.ttf');
        
        ww = localStorage.getItem('width');
        hh = localStorage.getItem('height');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh), sketch.WEBGL);
        pg = sketch.createGraphics(ww, hh, sketch.WEBGL);
        
        sketch.textFont(font);
        sketch.textAlign(sketch.LEFT, sketch.TOP);

        input = new p5.AudioIn();
        input.start();

        gl = this.canvas.getContext('webgl');
        gl.disable(gl.DEPTH_TEST);

        pg.shader(cloud);

        fft = new p5.FFT(0.8, 256);
        fft.setInput(input);
    }

    // ============================================================== //
    sketch.draw = function() {
        sketch.translate(-sketch.width/2,-sketch.height/2,0);

        let spectrum = fft.analyze();
        let energy = fft.getEnergy(energyRange.low, energyRange.high);
        let amp = sketch.map(energy, energyRange.low, energyRange.high, 0.4, 0.7, true);
        let speed = sketch.map(energy, energyRange.low, energyRange.high, 8, 8.2, true);
        let rotation = sketch.map(energy, energyRange.low, energyRange.high, 0.4, 0.85, true);

        cloud.setUniform("iResolution", [sketch.width, sketch.height]); //pass some values to the shader
        cloud.setUniform("iTime", sketch.millis() * 0.001);
        cloud.setUniform("amp", amp);
        cloud.setUniform("speed", speed);
        cloud.setUniform("rot", rotation);
        
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

        let colorBass = sketch.map(bass, 20, 255, 0, 255);
        let colorLowMid = sketch.map(lowMid, 20, 255, 0, 255);
        let colorMid = sketch.map(mid, 20, 255, 0, 255);
        let colorHighMid = sketch.map(highMid, 20, 255, 0, 255);
        let colorTreble = sketch.map(treble, 20, 255, 0, 255);

        sketch.textSize(24);
        sketch.text(even_tide_text, textLeft, textTop);
        sketch.fill(255, 255, 255, colorBass);
    }

    // ============================================================== //
    sketch.keyTyped = function() {

    }
}




                                                            