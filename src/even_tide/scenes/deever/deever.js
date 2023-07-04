const deever = function(sketch) {
    
    let ww;
    let hh;

    let fft;
    let osc;
    let input;

    let imgBg;
    let imgOrts

    // ============================================================== //
    sketch.preload = function() {
        ww = localStorage.getItem('width');
        hh = localStorage.getItem('height');

        imgBg = sketch.loadImage('scenes/deever/bg-2-pixel.png');
        imgOrts = sketch.loadImage('scenes/deever/layer1_with_alh-pixel2.png');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh), sketch.WEBGL);
        sketch.background(255);
        sketch.imageMode(sketch.CORNER);

        input = new p5.AudioIn();
        osc = new p5.Oscillator();
        input.start();

        fft = new p5.FFT(0.5, 1024);
        fft.setInput(input);
    }

    // ============================================================== //
    sketch.draw = function() {
        sketch.translate(-sketch.width/2,-sketch.height/2,0);
        
        let spectrum = fft.analyze();
        let waveform = fft.waveform();

        let bass = fft.getEnergy("bass");
        let lowMid = fft.getEnergy("lowMid");
        let mid = fft.getEnergy("mid");
        let highMid = fft.getEnergy("highMid");
        let treble = fft.getEnergy("treble");

        sketch.image(imgBg, 0, 0, ww, hh);

        sketch.image(imgOrts, 0, 0, ww, hh);
    }
}