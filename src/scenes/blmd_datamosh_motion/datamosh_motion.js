const datamoshMotion = function(sketch) {

    let ww;
    let hh;

    let bufferA, bufferB, bufferC, bufferD;
    let pgA, pgB, pgC, pgD, pgDatamosh;
    let datamosh;
    let cameraId;
    let camera;

    const pixelRatio = window.devicePixelRatio;

    // ============================================================== //
    sketch.preload = function() {
        ww = localStorage.getItem('reso_width');
        hh = localStorage.getItem('reso_height');
        cameraId = localStorage.getItem('camera_source');
        // bufferA = sketch.loadShader("blmd_datamosh_motion/datamosh_motion.vert","blmd_datamosh_motion/bufferA.frag");
        // bufferB = sketch.loadShader("blmd_datamosh_motion/datamosh_motion.vert","blmd_datamosh_motion/bufferB.frag");
        bufferC = sketch.loadShader("blmd_datamosh_motion/datamosh_motion.vert","blmd_datamosh_motion/bufferC.frag");
        bufferD = sketch.loadShader("blmd_datamosh_motion/datamosh_motion.vert","blmd_datamosh_motion/bufferD.frag");
        datamosh = sketch.loadShader("blmd_datamosh_motion/datamosh_motion.vert","blmd_datamosh_motion/datamosh_motion.frag");
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh), sketch.WEBGL);
        pgA = sketch.createGraphics(ww, hh, sketch.WEBGL);
        pgB = sketch.createGraphics(ww, hh, sketch.WEBGL);
        pgC = sketch.createGraphics(ww, hh, sketch.WEBGL);
        pgD = sketch.createGraphics(ww, hh, sketch.WEBGL);
        pgDatamosh = sketch.createGraphics(ww, hh, sketch.WEBGL);

        // pgA.shader(bufferA);
        // pgB.shader(bufferB);
        pgC.shader(bufferC);
        pgD.shader(bufferD);
        pgDatamosh.shader(datamosh);

        let constraints = {video: {deviceId: {exact: cameraId}}};
        camera = sketch.createCapture(constraints);

        gl = this.canvas.getContext('webgl');
        gl.disable(gl.DEPTH_TEST);

        sketch.imageMode(sketch.CENTER);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
    }

    // ============================================================== //
    sketch.draw = function() {
        // bufferA.setUniform("iResolution", [sketch.width * pixelRatio, sketch.height * pixelRatio]);
        // bufferA.setUniform("iChannel1", camera);
        // bufferA.setUniform("iChannel0", pgA);
        // bufferA.setUniform("iFrameMod2", sketch.frameCount % 2);

        // bufferB.setUniform("iResolution", [sketch.width * pixelRatio, sketch.height * pixelRatio]);
        // bufferB.setUniform("iChannel1", camera);
        // bufferB.setUniform("iChannel0", pgB);
        // bufferB.setUniform("iFrameMod2", sketch.frameCount % 2);

        if(sketch.frameCount % 2 == 0) {
            pgA = camera;
        } else {
            pbB = camera;
        }

        bufferC.setUniform("iResolution", [sketch.width * pixelRatio, sketch.height * pixelRatio]);
        bufferC.setUniform("iChannel0", pgA);
        bufferC.setUniform("iChannel1", pgB);
        bufferC.setUniform("iChannel2", camera);
        bufferC.setUniform("iChannel3", pgC);
        bufferC.setUniform("iFrameMod2", sketch.frameCount % 2);

        bufferD.setUniform("iResolution", [sketch.width * pixelRatio, sketch.height * pixelRatio]);
        bufferD.setUniform("iChannel0", pgC);
        bufferD.setUniform("iChannel1", pgD);
        bufferD.setUniform("iChannel2", camera);
        // bufferC.setUniform("iChannel3", pgC);
        bufferD.setUniform("iFrameMod2", sketch.frameCount % 2);

        datamosh.setUniform("iResolution", [sketch.width * pixelRatio, sketch.height * pixelRatio]);
        datamosh.setUniform("iChannel0", pgD);
        datamosh.setUniform("iChannel1", pgC);
        
        // pgA.box(sketch.width, sketch.height);
        // pgB.box(sketch.width, sketch.height);
        pgC.box(sketch.width, sketch.height);
        pgD.box(sketch.width, sketch.height);
        pgDatamosh.box(sketch.width, sketch.height);

        sketch.rect(sketch.width, sketch.height);
        sketch.image(pgDatamosh, 0, 0, sketch.width, sketch.height);
    }
}