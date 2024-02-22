const blueprint = function(sketch) {

    const energyRange = {
        low: 200,
        high: 300
    };

    let gl;
    let fft;
    let input;
    let pg;

    let blueprintShader;
    let carpetImg;

    const pixelRatio = window.devicePixelRatio;
    
    let ww;
    let hh;

    let gridSize = 0;
    let patternSize = 0;

    // ============================================================== //
    sketch.preload = function() {
        blueprintShader = sketch.loadShader('scenes/carpet_blueprint/blueprint.vert', 'scenes/carpet_blueprint/blueprint.frag');
        carpetImg = sketch.loadImage('scenes/carpet_blueprint/carpet.jpg');
        ww = localStorage.getItem('width');
        hh = localStorage.getItem('height');
        gridSize = ww / 30;
        patternSize = 150;
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh), sketch.WEBGL);
        pg = sketch.createGraphics(ww, hh, sketch.WEBGL);

        input = new p5.AudioIn();
        input.start();
        fft = new p5.FFT(0.8, 256);
        fft.setInput(input);

        gl = this.canvas.getContext('webgl');
        gl.disable(gl.DEPTH_TEST);

        pg.shader(blueprintShader);
        // sketch.imageMode(sketch.CENTER);
        // sketch.textAlign(sketch.CENTER, sketch.CENTER);
    }

    // ============================================================== //
    sketch.draw = function() {
        sketch.translate(-sketch.width/2,-sketch.height/2,0);
        let spectrum = fft.analyze();
        let energy = fft.getEnergy(200, 300);
        let scale = sketch.map(energy, energyRange.low, energyRange.high, 0.8, 1.6, true);

        blueprintShader.setUniform("iResolution", [sketch.width * pixelRatio, sketch.height * pixelRatio]);
	    blueprintShader.setUniform("iTime", sketch.millis() * 0.0001);
        blueprintShader.setUniform("iChannel0", carpetImg);

        // sketch.shader(blueprintShader);
        // sketch.rect(-sketch.width/2,-sketch.height/2,sketch.width, sketch.height);

        // pg.box(sketch.width, sketch.height);
        // panel.rect(-panel.width/2,5-panel.height/2,panel.width, panel.height);
        // sketch.rect(sketch.width, sketch.height);
        pg.box(sketch.width, sketch.height);
        sketch.rect(sketch.width, sketch.height);
        sketch.image(pg, 0 ,0, sketch.width, sketch.height);

        drawGrid();
        drawBlueprint(scale);
    }

    // ============================================================== //
    let drawGrid = function(){
        sketch.strokeWeight(0.2);
        sketch.stroke(255, 255, 255, 100);

        for(let x = 0; x < ww; x += gridSize) {
            sketch.line(x, 0, x, hh);
        }
        for(let y = 0; y < hh; y += gridSize) {
            sketch.line(0, y, ww, y);
        }
    }


    // ============================================================== //
    let drawBlueprint = function(scale) {
        sketch.fill(0,0,0,0);
        sketch.strokeWeight(0.6);
        sketch.stroke(255);

        let hhh = sketch.int(hh / patternSize) - 1;
        for(let x = patternSize; x < ww-patternSize; x += patternSize) {
            drawPatternUnit(x, patternSize, patternSize * scale);
            drawPatternUnit(x, patternSize * hhh, patternSize * scale);
        }

        let www = sketch.int(ww / patternSize) - 1;
        for(let y = patternSize * 2; y < hh - (patternSize * 2); y += patternSize) {
            drawPatternUnit(patternSize, y, patternSize * scale);
            drawPatternUnit(patternSize * www, y, patternSize * scale);
        }
    }

    // ============================================================== //
    let drawPatternUnit = function(x,y,d) {
        sketch.circle(x, y, d);
    }

    // ============================================================== //
    sketch.keyPressed = function() {

    }

}