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

  // ============================================================== //
  sketch.preload = function() {
    aurora = sketch.loadShader('scenes/aurora/aurora.vert', 'scenes/aurora/aurora.frag')
    img0 = sketch.loadImage('scenes/aurora/texture.png');
    img1 = sketch.loadImage('scenes/aurora/texture.png');
    logo = sketch.loadImage('scenes/aurora/hyper.png');
  }

  // ============================================================== //
  sketch.setup = function() {
    sketch.createCanvas(1920, 730, sketch.WEBGL);
    pg = sketch.createGraphics(1920, 730, sketch.WEBGL);

    input = new p5.AudioIn();
    input.start();

    gl = this.canvas.getContext('webgl');
    gl.disable(gl.DEPTH_TEST);

    pg.shader(aurora);
    sketch.imageMode(sketch.CENTER);

    fft = new p5.FFT(0.8, 256);
    fft.setInput(input);
  }

  // ============================================================== //
  sketch.draw = function() {
    let spectrum = fft.analyze();
    let bass = fft.getEnergy("mid");

    console.log(spectrum);

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
    sketch.image(logo, -200, -250, 750 * ratio, 686 * ratio);
  }

  // ============================================================== //
  sketch.keyTyped = function() {
    
  }
  
}