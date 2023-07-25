const menger = function(sketch) {

    const energyRange = {
        low: 135,
        high: 255
    };

    let pg;
    let logo;
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
        menger = sketch.loadShader('scenes/carpet_menger/menger.vert', 'scenes/carpet_menger/menger.frag');
        img0 = sketch.loadImage('scenes/carpet_menger/menger.png');
        img1 = sketch.loadImage('scenes/carpet_menger/carpet2.png');
        logo = sketch.loadImage('scenes/carpet_menger/logo_invert.png');
        ww = localStorage.getItem('width');
        hh = localStorage.getItem('height');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh), sketch.WEBGL);
        sketch.frameRate(30);
        pg = sketch.createGraphics(ww, hh, sketch.WEBGL);
        
        input = new p5.AudioIn();
        input.start();
        
        gl = this.canvas.getContext('webgl');
        gl.disable(gl.DEPTH_TEST);

        pg.shader(menger);

        fft = new p5.FFT(0.8, 256);
        fft.setInput(input);

        sketch.imageMode(sketch.CENTER);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
    }

    // ============================================================== //
    sketch.draw = function() {
        let spectrum = fft.analyze();
        let energy = fft.getEnergy(energyRange.low, energyRange.high);
        let speed = sketch.map(energy, energyRange.low, energyRange.high, 0.1, 0.3, true);
        let iteration = sketch.map(energy, energyRange.low, energyRange.high, 4, 6, true);
        
        menger.setUniform("iResolution", [sketch.width, sketch.height]); //pass some values to the shader
        menger.setUniform("iTime", sketch.millis() * 0.001);
        menger.setUniform("iChannel0", img0);
        menger.setUniform("iChannel1", img1);
        menger.setUniform("speed", speed);
        menger.setUniform("iteration", iteration);

        pg.shader(menger);
        pg.box(sketch.width, sketch.height, 0);
        sketch.image(pg, 0 ,0, sketch.width, sketch.height);
        sketch.image(logo, 0, -350, logo.width * 0.37, logo.height * 0.37);
    }

    // ============================================================== //
    sketch.keyTyped = function() {

    }
    
}