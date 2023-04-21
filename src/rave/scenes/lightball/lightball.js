const lightball = function(sketch) {

  const bassEnergyRange = {
    low: 130,
    high: 255
  };

  let gl;
  let ball;
  let fft;
  let input;

  // ============================================================== //
  sketch.preload = function() {
    ball = sketch.loadShader('scenes/lightball/lightball.vert', 'scenes/lightball/lightball.frag');
  }

  // ============================================================== //
  sketch.setup = function() {
    sketch.createCanvas(1920, 730, sketch.WEBGL);
    pg = sketch.createGraphics(1920, 730, sketch.WEBGL);

    input = new p5.AudioIn();
    input.start();
    
    gl = this.canvas.getContext('webgl');
    gl.disable(gl.DEPTH_TEST);

    pg.shader(ball);
    sketch.imageMode(sketch.CENTER);

    fft = new p5.FFT(0.8, 256);
    fft.setInput(input);
  }

  // ============================================================== //
  sketch.draw = function() {
    let spectrum = fft.analyze();
    let bass = fft.getEnergy("bass");
    let energyBass = sketch.map(bass, bassEnergyRange.low, bassEnergyRange.high, 0, sketch.width, true);

    ball.setUniform("iResolution", [sketch.width, sketch.height]); //pass some values to the shader
    ball.setUniform("iTime", sketch.millis() * 0.001);
    ball.setUniform("iMouse", [sketch.mouseX, sketch.mouseY]);
    ball.setUniform("energyBass", energyBass);

    // pg.shader(tiger);
    pg.box(sketch.width, sketch.height);
    sketch.image(pg, 0, 0, sketch.width, sketch.height);
  }

  // ============================================================== //
  sketch.keyTyped = function() {

  }
  
}