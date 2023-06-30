const deever = function(sketch) {
    
    let ww;
    let hh;

    let fft;
    let osc;
    let input;

    // ============================================================== //
    sketch.preload = function() {
        ww = localStorage.getItem('width');
        hh = localStorage.getItem('height');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh), sketch.WEBGL);
        sketch.background(255);

        input = new p5.AudioIn();
        osc = new p5.Oscillator();
        input.start();

        fft = new p5.FFT(0.5, 1024);
        fft.setInput(input);
    }

    // ============================================================== //
    sketch.draw = function() {
        let spectrum = fft.analyze();
        let waveform = fft.waveform();

        let bass = fft.getEnergy("bass");
        let lowMid = fft.getEnergy("lowMid");
        let mid = fft.getEnergy("mid");
        let highMid = fft.getEnergy("highMid");
        let treble = fft.getEnergy("treble");

        
    }
}