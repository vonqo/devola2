const deever = function(sketch) {
    
    let ww;
    let hh;
    let pw;
    let ph;

    let fft;
    let osc;
    let input;

    let imgBg;
    let imgOrts;
    let imgOrts2;
    let fftPanel;

    // ============================================================== //
    sketch.preload = function() {
        ww = localStorage.getItem('width');
        hh = localStorage.getItem('height');

        imgBg = sketch.loadImage('scenes/deever/bg-2-pixel.png');
        imgOrts = sketch.loadImage('scenes/deever/layer1_with_alh-pixel2.png');
        imgOrts2 = sketch.loadImage('scenes/deever/layer2-pixel.png');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh), sketch.WEBGL);
        sketch.background(255);
        sketch.imageMode(sketch.CORNER);

        pw = ww;
        ph = hh * 0.5;
        fftPanel = sketch.createGraphics(pw, ph);
        fftPanel.background(0, 0);

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

        sketch.image(imgBg, 0, 0, ww, hh);
        drawFFTSpectrograph(fftPanel, spectrum);
        sketch.tint(255, 128);
        sketch.image(fftPanel, 0, 0, pw, ph);
        sketch.tint(255, 255);
        sketch.image(imgOrts2, 0, 0, ww, hh);
        sketch.image(imgOrts, 0, 0, ww, hh);
    }

    // ============================================================== //
    let spectrographSpeed = 5;
    // bass = [20, 140];
    // lowMid = [140, 400];
    // mid = [400, 2600];
    // highMid = [2600, 5200];
    // treble = [5200, 14000]; 

    let drawFFTSpectrograph = function(panel, spectrum) {
        panel.noStroke();
        panel.copy(panel, 0, 0, pw, ph, -spectrographSpeed, 0, pw, ph);
        
        for (var i = 0; i < spectrum.length; i++) {
            var value = spectrum[i];
            // panel.fill(0, value, value * 0.3, 255);
            panel.fill(value, value, 0, 255);

            var percent = i / spectrum.length;
            var y = percent * ph;
            panel.rect(pw - spectrographSpeed, ph - y, spectrographSpeed, ph / spectrum.length);
        }

        // panel.loadPixels();
        // for (let i = 0; i < panel.width; i++) {
        //     for (let j = 0; j < panel.height; j++) {
        //         // let clr = panel.get(i,j);
        //         // // if(color )

        //         panel.set(i, j, sketch.color(0, 90, 102, 0));
        //     }
        // }
        // panel.updatePixels();

    }
}