const blank = function(sketch) {

    let ww;
    let hh;

    // ============================================================== //
    sketch.preload = function() {
        ww = localStorage.getItem('width');
        hh = localStorage.getItem('height');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh));
        sketch.background(0);
        sketch.noLoop();
    }

    // ============================================================== //
    sketch.draw = function() {
        
    }
}