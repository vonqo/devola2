const silvet_video = function(sketch) {

    let ww;
    let hh;
    let video;

    // ============================================================== //
    sketch.preload = function() {
        ww = localStorage.getItem('width');
        hh = localStorage.getItem('height');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh));
        sketch.smooth();
        video = sketch.createVideo('scenes/silvet/silvet_bg.mp4');
        video.volume(0);
        video.loop();
        video.hide();
    }

    // ============================================================== //
    sketch.draw = function() {
        let img = video.get();
        sketch.background(0);
        sketch.image(img, 0, 197, 1920, 685);
    }
}