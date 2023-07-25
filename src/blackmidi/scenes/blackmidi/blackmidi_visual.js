const blackmidi_visual = function(sketch) {

    let ww;
    let hh;
    let bg;

    // ============================================================== //
    sketch.preload = function() {
        ww = localStorage.getItem('width');
        hh = localStorage.getItem('height');
        bg = sketch.loadImage('scenes/blackmidi/bg.png');
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
        sketch.image(bg, ww/2, hh/2, 1920, 1080);
    }
}