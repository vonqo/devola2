const aurora = function(sketch) {

  const bassEnergyRange = {
    low: 130,
    high: 255
  };

  let gl;
  let aurora;
  let fft;
  let input;

  let img0;
  let img1;

  // ============================================================== //
  sketch.preload = function() {
    aurora = sketch.loadShader('scenes/aurora/aurora.vert', 'scenes/aurora/aurora.frag')
    img0 = sketch.loadImage('scenes/aurora/texture.png');
    img1 = sketch.loadImage('scenes/aurora/texture.png');
  }

  // ============================================================== //
  sketch.setup = function() {
    sketch.createCanvas(1920, 1080, sketch.WEBGL);
    pg = sketch.createGraphics(1920, 1080, sketch.WEBGL);

    input = new p5.AudioIn();
    input.start();

    gl = this.canvas.getContext('webgl');
    gl.disable(gl.DEPTH_TEST);

    // aurora = new p5.Shader(this._renderer, vert, frag);
    sketch.shader(aurora);

    fft = new p5.FFT(0.8, 256);
    fft.setInput(input);
  }

  // ============================================================== //
  sketch.draw = function() {
    let bass = fft.getEnergy("bass");
    let energyBass = sketch.map(bass, bassEnergyRange.low, bassEnergyRange.high, 0, sketch.width, true);

    aurora.setUniform("iResolution", [sketch.width, sketch.height]); //pass some values to the shader
    aurora.setUniform("iTime", sketch.millis() * 0.001);
    aurora.setUniform("iChannel0", img0);
    aurora.setUniform("iChannel1", img1);

    sketch.shader(aurora);
    sketch.box(sketch.width, sketch.height);
  }

  // ============================================================== //
  sketch.keyTyped = function() {

  }
  
}