const menger = function(sketch) {

    const energyRange = {
        low: 125,
        high: 255
    };

    let gl;
    let menger;
    let fft;
    let input;

    let img0;
    let img1;

    let ww;
    let hh;

    const pixelRatio = window.devicePixelRatio;

    // ============================================================== //
    sketch.preload = function() {
        menger = sketch.loadShader('blmd_carpet_menger/menger.vert', 'blmd_carpet_menger/menger.frag');
        img0 = sketch.loadImage('blmd_carpet_menger/menger.png');
        img1 = sketch.loadImage('blmd_carpet_menger/carpet2.png');
        ww = localStorage.getItem('reso_width');
        hh = localStorage.getItem('reso_height');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh), sketch.WEBGL);
        
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
        let energy = fft.getEnergy(energyRange.low, energyRange.high);
        let speed = sketch.map(energy, energyRange.low, energyRange.high, 0.1, 0.3, true);
        let iteration = sketch.map(energy, energyRange.low, energyRange.high, 4, 8, true);
        
        menger.setUniform("iResolution", [sketch.width * pixelRatio, sketch.height * pixelRatio]); //pass some values to the shader
        menger.setUniform("iTime", sketch.millis() * 0.001);
        menger.setUniform("iChannel0", img0);
        menger.setUniform("iChannel1", img1);
        menger.setUniform("speed", speed);
        menger.setUniform("iteration", iteration);

        sketch.shader(menger);
        sketch.box(sketch.width, sketch.height, 0);
    }

    // ============================================================== //
    sketch.keyTyped = function() {

    }
    
}