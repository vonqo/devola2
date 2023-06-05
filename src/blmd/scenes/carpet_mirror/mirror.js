const mirror = function(sketch) {

    let pg;
    let pg2;
    let gl;
    let fft;
    let input;
    
    let bassEnergyRange = {
        low: 128,
        high: 255
    };

    let carpetShader;
    let carpetBase = 1;
    let carpetImg;

    let nextCarpet = false;

    // ============================================================== //
    sketch.preload = function() {
        carpetShader = sketch.loadShader('scenes/carpet_mirror/mirror.vert', 'scenes/carpet_mirror/mirror.frag');
        carpetImg = sketch.loadImage('scenes/carpet_mirror/carpet.jpg');
        carpetImg2 = sketch.loadImage('scenes/carpet_mirror/carpet2.png');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(1920, 1080, sketch.WEBGL);
        pg = sketch.createGraphics(1920, 1080, sketch.WEBGL);
        pg2 = sketch.createGraphics(1920, 1080, sketch.WEBGL);
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

    // ============================================================== //
    sketch.draw = function() {
        let spectrum = fft.analyze();

        let bass = fft.getEnergy("mid");
        // let mapSize = 11 + (carpetBase * 1.5);

        let energyBass = sketch.map(bass, bassEnergyRange.low, bassEnergyRange.high, 0, 24, true);
        // let energyBassFont = sketch.map(bass, bassEnergyRange.low, bassEnergyRange.high, 0, 50, true);
        
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
        
        // shader() sets the active shader with our shader
        sketch.shader(carpetShader);
        // drawCarpetText(energyBassFont);
        // rect gives us some geometry on the screen
        sketch.rect(sketch.width, sketch.height);
        // box(width, height);
        // drawCarpetText(energyBassFont);
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