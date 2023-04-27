const glitch = function(sketch) {

    let gl;
    let fft;
    let input;
    
    let bassEnergyRange = {
        low: 128,
        high: 255
    };

    let carpetImg;
    let carpetShader;

    // ============================================================== //
    sketch.preload = function() {
        carpetShader = sketch.loadShader('scenes/carpet_glitch/glitch.vert', 'scenes/carpet_glitch/glitch.frag');
        carpetImg = sketch.loadImage('scenes/carpet_glitch/carpet.jpg');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(1920, 1080, sketch.WEBGL);
        pg = sketch.createGraphics(1920, 1080, sketch.WEBGL);

        input = new p5.AudioIn();
        input.start();
        fft = new p5.FFT(0.8, 256);
        fft.setInput(input);
        
        gl = this.canvas.getContext('webgl');
        gl.disable(gl.DEPTH_TEST);

        pg.shader(carpetShader);
        sketch.imageMode(sketch.CENTER);
    }

    // ============================================================== //
    sketch.draw = function() {
        let spectrum = fft.analyze();
        let bass = fft.getEnergy("bass");

        // sketch.shader(carpetShader);
        let energyBass = sketch.map(bass, bassEnergyRange.low, bassEnergyRange.high, 0, 1000, true);
        let glitcher = sketch.map(bass, bassEnergyRange.low, bassEnergyRange.high, 0.01, 0.1);

        carpetShader.setUniform("iResolution", [sketch.width, sketch.height]); //pass some values to the shader
        carpetShader.setUniform("iTime", sketch.millis() * 0.001);
        carpetShader.setUniform("iMouse", [energyBass,energyBass]);
        carpetShader.setUniform("glitcher", glitcher)
        carpetShader.setUniform("iChannel0", carpetImg);

        pg.box(sketch.width, sketch.height);
        sketch.image(pg, 0 ,0, sketch.width, sketch.height);
    }

    // ============================================================== //
    sketch.keyTyped = function() {
        
    }
    
}