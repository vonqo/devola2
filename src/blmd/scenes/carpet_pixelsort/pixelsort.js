const pixelsort = function(sketch) {

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
        carpetShader = sketch.loadShader('scenes/carpet_pixelsort/pixelsort.vert', 'scenes/carpet_pixelsort/pixelsort.frag');
        carpetImg = sketch.loadImage('scenes/carpet_pixelsort/carpet.jpg');
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
        // gl.disableVertexAttribArray();

        pg.shader(carpetShader);
        sketch.imageMode(sketch.CENTER);
    }

    // ============================================================== //
    sketch.draw = function() {
        let spectrum = fft.analyze();
        let bass = fft.getEnergy("bass");
        
        sketch.shader(carpetShader);
        let energyBass = sketch.map(bass, bassEnergyRange.low, bassEnergyRange.high, 0, 13, true);
        
        carpetShader.setUniform("iResolution", [sketch.width, sketch.height]); //pass some values to the shader
        carpetShader.setUniform("iTime", sketch.millis() * 0.001);
        carpetShader.setUniform("iChannel0", carpetImg);
        carpetShader.setUniform("energyBass", energyBass);
        
        pg.box(sketch.width, sketch.height);
        sketch.image(pg, 0 ,0, sketch.width, sketch.height);
    }

    // ============================================================== //
    sketch.keyTyped = function() {
        
    }
    
}