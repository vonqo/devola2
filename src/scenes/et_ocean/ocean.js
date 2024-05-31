const ocean = function(sketch) {

    const energyRange = {
        low: 125,
        high: 255
    };

    let gl;
    let ocean;
    let fft;
    let input;
    let pg;

    let ww;
    let hh;

    let freq = 0.1;

    const pixelRatio = window.devicePixelRatio;

    // ============================================================== //
    sketch.preload = function() {
        ww = localStorage.getItem('reso_width');
        hh = localStorage.getItem('reso_height');
        ocean = sketch.loadShader('et_ocean/ocean.vert', 'et_ocean/ocean.frag');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh), sketch.WEBGL);

        input = new p5.AudioIn();
        input.start();
        
        gl = this.canvas.getContext('webgl');
        gl.disable(gl.DEPTH_TEST);

        sketch.shader(ocean);

        fft = new p5.FFT(0.8, 256);
        fft.setInput(input);
        sketch.frameRate(30);
    }

    // ============================================================== //
    sketch.draw = function() {
        let spectrum = fft.analyze();
        let energy = fft.getEnergy(energyRange.low, energyRange.high);
        // let freq = sketch.map(energy, energyRange.low, energyRange.high, 0.05, 0.8);

        ocean.setUniform("iResolution", [sketch.width, sketch.height]); //pass some values to the shader
        ocean.setUniform("iTime", sketch.millis() * 0.001);
        ocean.setUniform("iFreq", freq);
        
        sketch.shader(ocean);
        sketch.box(sketch.width, sketch.height, 0);
        sketch.scale(0.5);

        if(sketch.keyIsDown(sketch.RIGHT_ARROW)) {
            if(freq < 1) freq += 0.005;
        } if(sketch.keyIsDown(sketch.LEFT_ARROW)) {
            if(freq > 0.05) freq -= 0.005;
        }
    }


}