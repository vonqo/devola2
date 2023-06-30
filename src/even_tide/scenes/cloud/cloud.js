const cloud = function(sketch) {

    const energyRange = {
        low: 130,
        high: 255
    };

    let gl;
    let cloud;
    let fft;
    let input;

    let ww;
    let hh;

    // ============================================================== //
    sketch.preload = function() {
        cloud = sketch.loadShader('scenes/cloud/cloud.vert', 'scenes/cloud/cloud.frag');
        ww = localStorage.getItem('width');
        hh = localStorage.getItem('height');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh), sketch.WEBGL);

        input = new p5.AudioIn();
        input.start();

        gl = this.canvas.getContext('webgl');
        gl.disable(gl.DEPTH_TEST);

        sketch.shader(cloud);

        fft = new p5.FFT(0.8, 256);
        fft.setInput(input);
    }

    // ============================================================== //
    sketch.draw = function() {
        let spectrum = fft.analyze();
        let energy = fft.getEnergy(energyRange.low, energyRange.high);
        let speed = sketch.map(energy, energyRange.low, energyRange.high, 0.1, 3.5, true);

        cloud.setUniform("iResolution", [sketch.width, sketch.height]); //pass some values to the shader
        cloud.setUniform("iTime", sketch.millis() * 0.001);
        // cloud.setUniform("speed", 31 - speed);
        
        sketch.shader(cloud);
        sketch.box(sketch.width, sketch.height, 0);
    }

    // ============================================================== //
    sketch.keyTyped = function() {

    }
}