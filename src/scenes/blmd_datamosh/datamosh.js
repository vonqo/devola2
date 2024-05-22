const datamosh = function(sketch) {

    let ww;
    let hh;

    let gl;
    let cam;
    let type = false;
    let previous;
    let datamosh;
    let datamoshBuffer;
    let imageBuffer;

    let thresholdScale = 0;
    let cameraId;
    let carpetImg;

    const pixelRatio = window.devicePixelRatio;

    // ============================================================== //
    sketch.preload = function() {
        ww = Number(localStorage.getItem('reso_width'));
        hh = Number(localStorage.getItem('reso_height'));
        cameraId = localStorage.getItem('camera_source');
        datamosh = sketch.loadShader("blmd_datamosh/datamosh.vert","blmd_datamosh/datamosh.frag");
        carpetImg = sketch.loadImage('blmd_datamosh/tear_rug_red.png');
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh), sketch.WEBGL);
        previous = sketch.createGraphics(ww, hh, sketch.WEBGL);
        datamoshBuffer = sketch.createGraphics(ww, hh, sketch.WEBGL);
        imageBuffer = sketch.createGraphics(ww, hh, sketch.WEBGL);

        let constraints = {video: {deviceId: {exact: cameraId}}};
        cam = sketch.createCapture(constraints);
        cam.size(ww,hh);
        cam.hide();

        gl = this.canvas.getContext('webgl');
        gl.disable(gl.DEPTH_TEST);
        
        datamoshBuffer.shader(datamosh);

        datamosh.setUniform("resolution", [ww * pixelRatio, hh * pixelRatio]);
        datamosh.setUniform("texture", cam);
        datamosh.setUniform("previous", previous);
        datamosh.setUniform("minVel", 0.01);
        datamosh.setUniform("maxVel", 0.5);
        datamosh.setUniform("offsetInc", 0.1);
        datamosh.setUniform("offset", [1.0, 1.0]);
        datamosh.setUniform("lambda", 1.0);
        datamosh.setUniform("scale", [1.5, 1.5]);
        datamosh.setUniform("intensity", 6.0);
        datamosh.setUniform("threshold", 0.0);
        sketch.frameRate(32);

        sketch.imageMode(sketch.CENTER);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        imageBuffer.imageMode(sketch.CENTER);
        imageBuffer.textAlign(sketch.CENTER, sketch.CENTER);

        carpetImg.resize(ww, hh);
    }

    // ============================================================== //
    sketch.draw = function() {
        let threshold = sketch.noise(sketch.millis() * 0.1, sketch.frameCount * 0.01) * thresholdScale + (1 - thresholdScale);
        let offsetRGB = sketch.noise(sketch.frameCount * 0.0125, sketch.millis() * 0.005) * 0.005;
        // let offsetRGB = sketch.noise(sketch.frameCount * 0.1, sketch.millis() * 0.05) * 0.05;
        
        datamosh.setUniform("previous", datamoshBuffer);
        datamosh.setUniform("threshold", threshold);
        datamosh.setUniform("offsetRGB", offsetRGB);
        datamosh.setUniform("time", sketch.millis());
        datamosh.setUniform("texture", cam);
        datamosh.setUniform("overlay", carpetImg);
        datamoshBuffer.box(sketch.width, sketch.height);
        
        sketch.rect(sketch.width, sketch.height);
        imageBuffer.rect(sketch.width, sketch.height);
        imageBuffer.tint(255, 25, 85);
        imageBuffer.image(datamoshBuffer, 0, 0, ww, hh);
        
        let img = Graphics2Image(imageBuffer);
        img.blend(carpetImg, 0, 0, sketch.width, sketch.height, 0, 0, sketch.width, sketch.height, sketch.EXCLUSION);

        sketch.image(img, 0, 0, ww, hh);
    }

    // ============================================================== //
    sketch.keyPressed = function() {
        if(sketch.key == 'a') {
            if(thresholdScale > 0) {
                thresholdScale -= 0.2;
            }
        }
        
        if(sketch.key == 'd') {
            if(thresholdScale < 2.0) {
                thresholdScale += 0.2;
            }
        }
    }

    // ============================================================== //
    let Graphics2Image = function(buffer) {
        let img = sketch.createImage(buffer.width, buffer.height);

        //WgbGL coordinate fix
        img.copy(buffer, -buffer.width/2, -buffer.height/2, buffer.width, buffer.height, 0, 0, buffer.width, buffer.height);
        return img;
    }
}