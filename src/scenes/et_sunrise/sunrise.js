const sunrise = function(sketch) {

    let ww;
    let hh;

    const pixelRatio = window.devicePixelRatio;

    // ============================================================== //
    sketch.preload = function() {
        ww = localStorage.getItem('reso_width');
        hh = localStorage.getItem('reso_height');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh), sketch.WEBGL);
    }

    // ============================================================== //
    sketch.draw = function() {

    }
}