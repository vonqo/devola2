const glitch = function(sketch) {

    const energyRange = {
        low: 200,
        high: 300
    };

    let gl;
    let fft;
    let input;

    let carpetImg;
    let carpetImgInvert;
    let carpetShader;
    let isInvert = false;

    let ww;
    let hh;

    const pixelRatio = window.devicePixelRatio;

    // ============================================================== //
    sketch.preload = function() {
        carpetShader = sketch.loadShader('scenes/carpet_glitch/glitch.vert', 'scenes/carpet_glitch/glitch.frag');
        carpetImg = sketch.loadImage('scenes/carpet_glitch/carpet.jpg');
        carpetImgInvert = sketch.loadImage('scenes/carpet_glitch/invert_carpet.jpg');
        ww = localStorage.getItem('width');
        hh = localStorage.getItem('height');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh), sketch.WEBGL);
        pg = sketch.createGraphics(ww, hh, sketch.WEBGL);

        input = new p5.AudioIn();
        input.start();
        fft = new p5.FFT(0.8, 256);
        fft.setInput(input);
        
        gl = this.canvas.getContext('webgl');
        gl.disable(gl.DEPTH_TEST);

        pg.shader(carpetShader);
        sketch.imageMode(sketch.CENTER);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
    }

    // ============================================================== //
    sketch.draw = function() {
        let spectrum = fft.analyze();
        let energy = fft.getEnergy(200, 300);
        // sketch.translate(-ww/2,-hh/2,0);
        // pg.translate(-pg.width/2,-pg.height/2,0);
        
        // sketch.shader(carpetShader);
        let energyBass = sketch.map(energy, energyRange.low, energyRange.high, 0, 1000, true);
        let glitcher = sketch.map(energy, energyRange.low, energyRange.high, 0.02, 0.2);

        carpetShader.setUniform("iResolution", [sketch.width * pixelRatio, sketch.height * pixelRatio]); //pass some values to the shader
        carpetShader.setUniform("iTime", sketch.millis() * 0.001);
        carpetShader.setUniform("iMouse", [energyBass,energyBass]);
        carpetShader.setUniform("glitcher", glitcher);

        if(isInvert) {
            carpetShader.setUniform("iChannel0", carpetImgInvert);
        } else {
            carpetShader.setUniform("iChannel0", carpetImg);
        }
        
        pg.box(sketch.width, sketch.height);
        sketch.rect(sketch.width, sketch.height);
        sketch.image(pg, 0 ,0, sketch.width, sketch.height);
    }

    // ============================================================== //
    sketch.keyPressed = function() {
        console.log('KEY PRESSED');
        if(sketch.keyCode === sketch.UP_ARROW) {
            isInvert = false;
        } else if(sketch.keyCode === sketch.DOWN_ARROW) {
            isInvert = true;
        }
    }
    
}