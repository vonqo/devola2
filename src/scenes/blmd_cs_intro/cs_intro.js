const cs_intro = function(sketch) {

    let ww;
    let hh;

    // const pixelRatio = window.devicePixelRatio;
    const pixelRatio = 2.8;

    let bg;
    let banner;
    let loadingWindow;
    let font;
    let percent = 0;

    // ============================================================== //
    sketch.preload = function() {
        ww = localStorage.getItem('reso_width');
        hh = localStorage.getItem('reso_height');
        bg = sketch.loadImage('blmd_cs_intro/corporate.png');
        loadingWindow = sketch.loadImage('blmd_cs_intro/window.png');
        banner = sketch.loadImage('blmd_cs_intro/banner.png');
        font = sketch.loadFont('../../assets/font/verdana/verdanabp.ttf');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh));
        sketch.textFont(font);
        sketch.background(0);
        sketch.noSmooth();
    }

    // ============================================================== //
    sketch.draw = function() {
        sketch.tint(75,75,75);
        sketch.image(bg, 0, 0, sketch.width, sketch.height);
        
        sketch.tint(255);
        drawLoadingWindow(sketch.width / 2 - loadingWindow.width * pixelRatio / 2, sketch.height * 0.1, percent);

        if(sketch.keyIsDown(sketch.LEFT_ARROW)) {
            if(percent > 0) percent -= 0.005;
        } if(sketch.keyIsDown(sketch.RIGHT_ARROW)) {
            if(percent < 1) percent += 0.005;
        } 
    }

    // ============================================================== //
    const p_step = 12 * pixelRatio;
    
    let drawLoadingWindow = function(x, y, p) {
        sketch.image(loadingWindow, x, y, loadingWindow.width * pixelRatio, loadingWindow.height * pixelRatio);

        sketch.textSize(15 * pixelRatio);
        sketch.fill(255);
        sketch.text('Loading ... (de_corporate)', x + (20 * pixelRatio), y + (20 * pixelRatio));
        
        sketch.textSize(10 * pixelRatio);
        sketch.fill(165, 170, 148);
        sketch.text('Deathwish 2024 (Xtravaganza)', x + (20 * pixelRatio), y + (55 * pixelRatio))

        sketch.noStroke();
        sketch.fill(198, 182, 82);

        let bw = 255 * pixelRatio;
        let bb = (bw * p) / p_step | 0;

        for(let i = 0; i < bb; i++) {
            sketch.rect(x + (24 * pixelRatio) + (i * p_step), y + (68 * pixelRatio), 9 * pixelRatio, 15 * pixelRatio);
        }

        sketch.image(banner, x + (20 * pixelRatio), y + (115 * pixelRatio), banner.width * pixelRatio, banner.height * pixelRatio);
    }
}