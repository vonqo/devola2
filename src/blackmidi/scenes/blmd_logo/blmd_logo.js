const blmd_logo = function(sketch) {

    let ww;
    let hh;
    let bg;
    let logo;

    // ============================================================== //
    sketch.preload = function() {
        ww = localStorage.getItem('width');
        hh = localStorage.getItem('height');
        bg = sketch.loadImage('scenes/blmd_logo/bg.png');
        logo = sketch.loadImage('scenes/blmd_logo/logo_invert.png');
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
        // sketch.image(bg, ww/2, hh/2);
        sketch.image(logo, ww/2, hh/2 - 100, logo.width * 0.5, logo.height * 0.5);
    }
}