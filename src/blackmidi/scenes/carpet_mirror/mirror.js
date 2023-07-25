const mirror = function(sketch) {

    const energyRange = {
        low: 100,
        high: 255
    };

    let pg;
    let pg2;
    let pg3;
    let gl;
    let fft;
    let input;

    let logo;
    let carpetShader;
    let carpetBase = 1;
    let carpetImg;

    let nextCarpet = false;

    let ww;
    let hh;

    // ============================================================== //
    sketch.preload = function() {
        carpetShader = sketch.loadShader('scenes/carpet_mirror/mirror.vert', 'scenes/carpet_mirror/mirror.frag');
        carpetImg = sketch.loadImage('scenes/carpet_mirror/carpet.jpg');
        carpetImg2 = sketch.loadImage('scenes/carpet_mirror/carpet2.png');
        logo = sketch.loadImage('scenes/carpet_mirror/logo_invert.png');
        ww = localStorage.getItem('width');
        hh = localStorage.getItem('height');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh), sketch.WEBGL);
        sketch.frameRate(30);
        pg = sketch.createGraphics(ww, hh, sketch.WEBGL);
        pg2 = sketch.createGraphics(ww, hh, sketch.WEBGL);
        pg3 = sketch.createGraphics(ww, hh, sketch.WEBGL);
        pg.image(carpetImg, -sketch.width/2, -sketch.height/2, sketch.width, sketch.height);
        pg2.image(carpetImg2, -sketch.width/2, -sketch.height/2, sketch.width, sketch.height);


        input = new p5.AudioIn();
        input.start();
        fft = new p5.FFT(0.8, 256);
        fft.setInput(input);
        
        gl = this.canvas.getContext('webgl');
        gl.disable(gl.DEPTH_TEST);

        sketch.imageMode(sketch.CENTER);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
    }

    // bass = [20, 140];
    // lowMid = [140, 400];
    // mid = [400, 2600];
    // highMid = [2600, 5200];
    // treble = [5200, 14000]; 
    // ============================================================== //
    sketch.draw = function() {
        let spectrum = fft.analyze();
        sketch.translate(-sketch.width/2,-sketch.height/2,0);

        let energy = fft.getEnergy(energyRange.low, energyRange.high);
        // let mapSize = 11 + (carpetBase * 1.5);

        let energyBass = sketch.map(energy, energyRange.low, energyRange.high, 0, 24, true);
        
        if(sketch.keyIsDown(sketch.RIGHT_ARROW)) {
            carpetBase += 1;
        } if(sketch.keyIsDown(sketch.LEFT_ARROW)) {
            if(carpetBase > 1) {
                carpetBase -= 1;
            }
        } 
        
        //const mx = map(mouseX, 0, width, 0, 100);
        //const my = map(mouseY, 0, height, 0, 100);
        
        const mx = (energyBass * 1.5) + carpetBase;
        const my = (energyBass) + carpetBase;
        
        // Send the image to the shader
        if(nextCarpet) {
            carpetShader.setUniform("uTexture", pg);
        } else {
            carpetShader.setUniform("uTexture", pg2);
        }
        carpetShader.setUniform("uScale", [mx, my]);
        
        // sketch.shader(carpetShader);
        // sketch.rect(sketch.width, sketch.height);
        
        pg3.shader(carpetShader);
        pg3.rect(sketch.width, sketch.height);
        sketch.image(pg3, ww/2, hh/2);
        sketch.image(logo, ww/2, hh/2 - 350, logo.width * 0.37, logo.height * 0.37);
    }

    // ============================================================== //
    sketch.keyPressed = function() {
        // console.log('KEY PRESSED');
        // console.log(sketch.key);
        if(sketch.keyCode === sketch.UP_ARROW) {
            carpetBase += 100;
        } else if(sketch.keyCode === sketch.DOWN_ARROW) {
            carpetBase = 0;
        } else if(sketch.keyCode === sketch.ENTER) {
            nextCarpet = !nextCarpet;
        }
    }
    
}