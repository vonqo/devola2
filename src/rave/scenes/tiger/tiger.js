const tiger = function(sketch) {

  const bassEnergyRange = {
    low: 130,
    high: 255
  };

  let gl;
  let tiger;
  let fft;
  let input;

  let img0;
  let img1;
  
  // ============================================================== //
  sketch.preload = function() {
    tiger = sketch.loadShader('scenes/tiger/tiger.vert', 'scenes/tiger/tiger.frag')
    img0 = sketch.loadImage('scenes/tiger/texture.png');
    img1 = sketch.loadImage('scenes/tiger/texture.png');
  }

  // ============================================================== //
  sketch.setup = function() {
    sketch.createCanvas(1920, 1080, sketch.WEBGL);
    pg = sketch.createGraphics(1920, 1080, sketch.WEBGL);

    input = new p5.AudioIn();
    input.start();
    
    gl = this.canvas.getContext('webgl');
    gl.disable(gl.DEPTH_TEST);

    sketch.shader(aurora);

    fft = new p5.FFT(0.8, 256);
    fft.setInput(input);
  } 

  // ============================================================== //
  sketch.draw = function() {
    let bass = fft.getEnergy("bass");
    let energyBass = sketch.map(bass, bassEnergyRange.low, bassEnergyRange.high, 0, sketch.width, true);

    tiger.setUniform("iResolution", [sketch.width, sketch.height]); //pass some values to the shader
    tiger.setUniform("iTime", sketch.millis() * 0.001);
    tiger.setUniform("iChannel0", img0);
    tiger.setUniform("iChannel1", img1);
    tiger.setUniform("energyBass", energyBass);

    sketch.shader(aurora);
    sketch.box(sketch.width, sketch.height);
  }

  // ============================================================== //
  sketch.keyTyped = function() {

  }

}