const silvet_logo = function(sketch) {

    let ww;
    let hh;
    let logo;

    // ============================================================== //
    sketch.preload = function() {
        ww = localStorage.getItem('width');
        hh = localStorage.getItem('height');
        logo = sketch.loadImage('scenes/silvet_logo/logo.png');
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
        sketch.image(logo, ww/2, hh/2 - 100, logo.width * 1.45, logo.height * 1.45);
    }
}