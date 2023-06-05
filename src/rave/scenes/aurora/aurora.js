const aurora = function(sketch) {

  const bassEnergyRange = {
    low: 100,
    high: 255
  };

  let gl;
  let aurora;
  let fft;
  let input;

  let img0;
  let img1;
  let logo;

  let music

  // ============================================================== //
  sketch.preload = function() {
    aurora = sketch.loadShader('scenes/aurora/aurora.vert', 'scenes/aurora/aurora.frag')
    img0 = sketch.loadImage('scenes/aurora/texture.png');
    img1 = sketch.loadImage('scenes/aurora/texture.png');
    logo = sketch.loadImage('scenes/aurora/hyper.png');
    music = sketch.loadSound('scenes/aurora/hyperworld.mp3');
  }

  // ==================================== ========================== //
  sketch.setup = function() {
    sketch.createCanvas(1920, 1080, sketch.WEBGL);
    pg = sketch.createGraphics(1920, 1080, sketch.WEBGL);

    // input = new p5.AudioIn();
    // input.start();
    // music.noLoop();
    music.play();

    gl = this.canvas.getContext('webgl');
    gl.disable(gl.DEPTH_TEST);

    pg.shader(aurora);
    sketch.imageMode(sketch.CENTER);

    fft = new p5.FFT(0.8, 256);
    fft.setInput(music);
  }

  // ============================================================== //
  sketch.draw = function() {
    let spectrum = fft.analyze();
    let bass = fft.getEnergy("mid");
    sketch.smooth();

    let energyBass = sketch.map(bass, bassEnergyRange.low, bassEnergyRange.high, 0.2, 0.7, true);
    // let energyMid = sketch.map(mid),

    aurora.setUniform("iResolution", [sketch.width, sketch.height]); //pass some values to the shader
    aurora.setUniform("iTime", sketch.millis() * 0.001);
    aurora.setUniform("iChannel0", img0);
    aurora.setUniform("iChannel1", img1);
    aurora.setUniform("energyBass", energyBass);

    pg.box(sketch.width, sketch.height);

    sketch.image(pg, 0 ,0, sketch.width, sketch.height);

    ratio = sketch.map(bass, bassEnergyRange.low, bassEnergyRange.high, 0.2, 0.45, true);
    sketch.image(logo, 0, -300, 750 * ratio, 750 * ratio);
  }

  // ============================================================== //
  sketch.keyTyped = function() {
    
  }
  
}