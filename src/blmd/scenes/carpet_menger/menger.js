const menger = function(sketch) {

    const bassEnergyRange = {
        low: 130,
        high: 255
    };

    let gl;
    let menger;
    let fft;
    let input;

    let img0;
    let img1;

    // ============================================================== //
    sketch.preload = function() {
        menger = sketch.loadShader('scenes/carpet_menger/menger.vert', 'scenes/carpet_menger/menger.frag')
        img0 = sketch.loadImage('scenes/carpet_menger/carpet1.jpeg');
        img1 = sketch.loadImage('scenes/carpet_menger/carpet1.jpeg');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(1920, 730, sketch.WEBGL);
        pg = sketch.createGraphics(1920, 730, sketch.WEBGL);

        input = new p5.AudioIn();
        input.start();
        
        gl = this.canvas.getContext('webgl');
        gl.disable(gl.DEPTH_TEST);

        sketch.shader(menger);

        fft = new p5.FFT(0.8, 256);
        fft.setInput(input);
    }

    // ============================================================== //
    sketch.draw = function() {
        let spectrum = fft.analyze();
        let bass = fft.getEnergy("bass");
        let energyBass = sketch.map(bass, bassEnergyRange.low, bassEnergyRange.high, 0, sketch.width, true);
    
        menger.setUniform("iResolution", [sketch.width, sketch.height]); //pass some values to the shader
        menger.setUniform("iTime", sketch.millis() * 0.001);
        menger.setUniform("iMouse", [365, energyBass]);
        menger.setUniform("iChannel0", img0);
        menger.setUniform("iChannel1", img1);
        menger.setUniform("energyBass", energyBass);

        sketch.shader(menger);
        sketch.box(sketch.width, sketch.height);
    }

    // ============================================================== //
    sketch.keyTyped = function() {

    }
    
}