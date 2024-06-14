const dotorHuree = function(sketch) {

    let ww;
    let hh;

    const pixelRatio = window.devicePixelRatio;

    let bg;
    let logo;

    let gertee;
    let muchir;
    let sar;

    let mode = 0;

    // ============================================================== //
    sketch.preload = function() {
        ww = localStorage.getItem('reso_width');
        hh = localStorage.getItem('reso_height');
        bg = sketch.loadImage('dotor_huree/dotor_huree_bg.png');
        logo = sketch.loadImage('dotor_huree/dotor_huree_logo.png');
        gertee = sketch.loadImage('dotor_huree/GERTEE.png');
        muchir = sketch.loadImage('dotor_huree/MUCHIR.png');
        sar = sketch.loadImage('dotor_huree/SAR.png');
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
        sketch.background(0);
        let spectrum = fft.analyze();
        let energy = fft.getEnergy(100, 255);
        let scale = sketch.map(energy, 100, 255, 0.8, 1.3);

        if(mode === 1) {
            sketch.image(bg, sketch.width/2, sketch.height/2, bg.width, bg.height);
            sketch.image(logo, sketch.width/2, sketch.height/2, logo.width * scale, logo.height * scale);
        } else if(mode === 2) {
            sketch.image(sar, sketch.width/2, sketch.height/2, sar.width, sar.height);
        } else if(mode === 3) {
            sketch.image(muchir, sketch.width/2, sketch.height/2, muchir.width, muchir.height);
        } else if(mode === 4) {
            sketch.image(gertee, sketch.width/2, sketch.height/2, gertee.width, gertee.height);
        }
        
    }

    // ============================================================== //
    sketch.keyPressed = function() {
        if(sketch.key === 'a' || sketch.key === 'A') {
            mode = 1;
        } else if(sketch.key === 's' || sketch.key === 'S') {
            mode = 2;
        } else if(sketch.key === 'd' || sketch.key === 'D') {
            mode = 3;
        } else if(sketch.key === 'f' || sketch.key === 'F') {
            mode = 4;
        }
    }
}