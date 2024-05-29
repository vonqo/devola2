const vol7intro = function(sketch) {

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

    let cozyImg;

    // ============================================================== //
    sketch.preload = function() {
        ww = localStorage.getItem('reso_width');
        hh = localStorage.getItem('reso_height');
        bg = sketch.loadImage('blmd_vol7_intro/bg.png');
        farBuildings = sketch.loadImage('blmd_vol7_intro/far-buildings.png');
        buildings = sketch.loadImage('blmd_vol7_intro/buildings.png');
        group = sketch.loadImage('blmd_vol7_intro/groupbit.png');
        cozyImg = sketch.loadImage('blmd_vol7_intro/mistabone_white.png');
        font = sketch.loadFont('../../assets/font/videotype/videotype.ttf');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh));
        sketch.textFont(font);
        sketch.background(0);
        bg_x2 = sketch.width;
        farBuildings_x2 = sketch.width;
        building_x2 = sketch.width
    }

    // ============================================================== //
    sketch.draw = function() {
        sketch.image(bg, bg_x1, 0, sketch.width, sketch.height);
        sketch.image(bg, bg_x2, 0, sketch.width, sketch.height);

        sketch.image(farBuildings, farBuildings_x1, 0, sketch.width, sketch.height);
        sketch.image(farBuildings, farBuildings_x2, 0, sketch.width, sketch.height);

        sketch.image(buildings, building_x1, 0, sketch.width, sketch.height);
        sketch.image(buildings, building_x2, 0, sketch.width, sketch.height);
        
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

        if(mode === 1) {
            drawIntro();
        } else if(mode === 2) {
            drawBuska();
        } else if(mode === 3) {
            drawCozy();
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
        } 
    }

    // ============================================================== //
    let drawIntro = function() {
        sketch.noStroke();
        sketch.fill(255);
        sketch.textSize(52);

        sketch.text('NEW GAME / Difficulty: B.L.M.D', 
            sketch.width * 0.2, 
            sketch.height * 0.55 - 100
        );
        
        sketch.text(sketch.int(percent * 100) + '%', sketch.width * 0.2, sketch.height * 0.55 - 30);

        sketch.strokeWeight(4);
        sketch.stroke(255);
        sketch.fill(255);
        sketch.rect(sketch.width * 0.2, sketch.height * 0.55, sketch.width * 0.6, sketch.height * 0.05);
        
        sketch.fill(24, 40, 31);
        sketch.rect(sketch.width * 0.2, sketch.height * 0.55, sketch.width * 0.6 * percent, sketch.height * 0.05);

        sketch.image(group, sketch.width * 0.2, sketch.height * 0.01, group.width * 0.8, group.height * 0.8);
        
        if(sketch.keyIsDown(sketch.LEFT_ARROW)) {
            if(percent > 0) percent -= 0.005;
        } if(sketch.keyIsDown(sketch.RIGHT_ARROW)) {
            if(percent < 1) percent += 0.005;
        } 
    }

    // ============================================================== //
    let drawBuska = function() {
        sketch.noStroke();
        sketch.fill(255);
        sketch.textSize(76);

        sketch.text('BUSKA', 
            sketch.width * 0.2, 
            sketch.height * 0.35,
        );
    }

    // ============================================================== //
    let drawCozy = function() {
        sketch.noStroke();
        sketch.fill(255);
        sketch.textSize(76);

        sketch.text('MISTA BONE', 
            sketch.width * 0.2, 
            sketch.height * 0.35
        );

        sketch.image(cozyImg, sketch.width * 0.45, sketch.height * 0.1, cozyImg.width * 0.65, cozyImg.height * 0.65);
    }
}