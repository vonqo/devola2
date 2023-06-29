const menger = function(sketch) {

    const energyRange = {
        low: 130,
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

    // ============================================================== //
    sketch.preload = function() {
        menger = sketch.loadShader('scenes/carpet_menger/menger.vert', 'scenes/carpet_menger/menger.frag')
        img0 = sketch.loadImage('scenes/carpet_menger/menger.png');
        img1 = sketch.loadImage('scenes/carpet_menger/carpet2.png');
        ww = localStorage.getItem('width');
        hh = localStorage.getItem('height');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh), sketch.WEBGL);
        pg = sketch.createGraphics(ww, hh, sketch.WEBGL);
        
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
        let bass = fft.getEnergy(energyRange.low, energyRange.high);
        let speed = sketch.map(bass, energyRange.low, energyRange.high, 0.1, 3.5, true);
    
        menger.setUniform("iResolution", [sketch.width, sketch.height]); //pass some values to the shader
        menger.setUniform("iTime", sketch.millis() * 0.001);
        menger.setUniform("iChannel0", img0);
        menger.setUniform("iChannel1", img1);
        menger.setUniform("speed", 31 - speed);

        sketch.shader(menger);
        sketch.box(sketch.width, sketch.height);
    }

    // ============================================================== //
    sketch.keyTyped = function() {

    }
    
}