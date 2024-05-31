const et = function(sketch) {

    let ww;
    let hh;

    const pixelRatio = window.devicePixelRatio;

    let bg;
    let logo;

    // ============================================================== //
    sketch.preload = function() {
        ww = localStorage.getItem('reso_width');
        hh = localStorage.getItem('reso_height');
        bg = sketch.loadImage('et/bg.jpg');
        logo = sketch.loadImage('et/logo.png');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh));

        input = new p5.AudioIn();
        input.start();
        fft = new p5.FFT(0.8, 256);
        fft.setInput(input);

        sketch.imageMode(sketch.CENTER);
    }

    // ============================================================== //
    sketch.draw = function() {
        let spectrum = fft.analyze();
        let energy = fft.getEnergy(100, 255);
        let scale = sketch.map(energy, 100, 255, 0.9, 1.25);

        sketch.image(bg, sketch.width/2, sketch.height/2, bg.width, bg.height);
        sketch.image(logo, sketch.width/2, sketch.height/2, logo.width, logo.height);
    }
}