const vol7outro = function(sketch) {

    let ww;
    let hh;

    const pixelRatio = window.devicePixelRatio;

    let group;

    let bg;
    let farBuildings;
    let buildings;
    let font;

    let percent = 0;

    let scrollSpeed = 2;
    let bg_x1 = 0;
    let bg_x2 = 0;

    let farBuildings_x1 = 0;
    let farBuildings_x2 = 0;

    let building_x1 = 0;
    let building_x2 = 0;

    let mode = 0;
    let badge;


    // ============================================================== //
    sketch.preload = function() {
        ww = localStorage.getItem('reso_width');
        hh = localStorage.getItem('reso_height');
        bg = sketch.loadImage('blmd_vol7_intro/bg.png');
        farBuildings = sketch.loadImage('blmd_vol7_intro/far-buildings.png');
        buildings = sketch.loadImage('blmd_vol7_intro/buildings.png');
        group = sketch.loadImage('blmd_vol7_intro/groupbit.png');
        badge = sketch.loadImage('blmd_vol7_intro/vol7badge.png');
        font = sketch.loadFont('../../assets/font/videotype/videotype.ttf');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh));
        sketch.textFont(font);
        sketch.background(0);
        sketch.textAlign(sketch.CENTER);
        sketch.imageMode(sketch.CENTER);
        bg_x2 = sketch.width;
        farBuildings_x2 = sketch.width;
        building_x2 = sketch.width
    }

    // ============================================================== //
    sketch.draw = function() {
        sketch.image(bg, bg_x1 + (sketch.width * 0.5), (sketch.height * 0.5), sketch.width, sketch.height);
        sketch.image(bg, bg_x2 + (sketch.width * 0.5), (sketch.height * 0.5), sketch.width, sketch.height);

        sketch.image(farBuildings, farBuildings_x1 + (sketch.width * 0.5), (sketch.height * 0.5), sketch.width, sketch.height);
        sketch.image(farBuildings, farBuildings_x2 + (sketch.width * 0.5), (sketch.height * 0.5), sketch.width, sketch.height);

        sketch.image(buildings, building_x1 + (sketch.width * 0.5), (sketch.height * 0.5), sketch.width, sketch.height);
        sketch.image(buildings, building_x2 + (sketch.width * 0.5), (sketch.height * 0.5), sketch.width, sketch.height);
        
        bg_x1 -= scrollSpeed * 0.2;
        bg_x2 -= scrollSpeed * 0.2;

        farBuildings_x1 -= scrollSpeed * 0.6;
        farBuildings_x2 -= scrollSpeed * 0.6;

        building_x1 -= scrollSpeed;
        building_x2 -= scrollSpeed;
        
        if (bg_x1 < -sketch.width){
            bg_x1 = sketch.width;
        }
        if (bg_x2 < -sketch.width){
            bg_x2 = sketch.width;
        }

        if (farBuildings_x1 < -sketch.width) {
            farBuildings_x1 = sketch.width;
        }
        if (farBuildings_x2 < -sketch.width) {
            farBuildings_x2 = sketch.width;
        }

        if (building_x1 < -sketch.width) {
            building_x1 = sketch.width;
        }
        if (building_x2 < -sketch.width) {
            building_x2 = sketch.width;
        }

        drawOutro();
    }

    // ============================================================== //
    sketch.keyPressed = function() {
        if(sketch.key === 'a' || sketch.key === 'A') {
            mode = 1;
        } else if(sketch.key === 's' || sketch.key === 'S') {
            mode = 2;
        } else if(sketch.key === 'd' || sketch.key === 'D') {
            mode = 3;
        } 
    }

    // ============================================================== //
    let drawOutro = function() {
        sketch.noStroke();
        sketch.fill(255);
        sketch.textSize(96);

        sketch.text('YOU ARE VICTORIOUS', 
            sketch.width * 0.5 - 40,
            sketch.height * 0.5 - 100
        );
        
        sketch.image(group, sketch.width * 0.5 - 50, sketch.height * 0.5 - 350, group.width * 0.5, group.height * 0.5);

        sketch.image(badge, sketch.width-300, sketch.height * 0.5 - 140, sketch.width * 0.15, sketch.width * 0.15);
        sketch.image(badge, 220, sketch.height * 0.5 - 140, sketch.width * 0.15, sketch.width * 0.15);
        
    }
}