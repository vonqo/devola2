const blackmidi_logo = function(sketch) {

    let ww;
    let hh;
    let logo;

    // ============================================================== //
    sketch.preload = function() {
        ww = localStorage.getItem('width');
        hh = localStorage.getItem('height');
        logo = sketch.loadImage('scenes/blackmidi_logo/bmidi.jpg');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh));
        sketch.background(0);
        sketch.noLoop();
        sketch.smooth();
        sketch.imageMode(sketch.CENTER);
    }

    // ============================================================== //
    sketch.draw = function() {
        sketch.image(logo, ww/2, hh/2 - 150, logo.width * 0.25, logo.height * 0.25);
    }
}