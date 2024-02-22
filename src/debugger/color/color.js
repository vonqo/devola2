const colorDebug = function(sketch) {

    let font;
    let fft;
    let osc;
    let input;
  
    let ww;
    let hh;
    let pw;
    let ph;
  
    let panel;
    let shader;
    let gl;
  
    const pixelRatio = window.devicePixelRatio;
  
    // ============================================================== //
    sketch.preload = function() {
      ww = 400;
      hh = 200;
      font = sketch.loadFont('assets/font/JetBrainsMono/JetBrainsMono-Medium.ttf');
      shader = sketch.loadShader('src/debugger/color/basic.vert', 'src/debugger/color/basic.frag');
    }
  
    // ============================================================== //
    sketch.setup = function() {
      sketch.createCanvas(Number(ww), Number(hh), sketch.WEBGL);
      sketch.background(13, 17, 23);
      sketch.imageMode(sketch.CORNER);
  
      gl = this.canvas.getContext('webgl');
      gl.disable(gl.DEPTH_TEST);
  
      panel = sketch.createGraphics(ww, hh, sketch.WEBGL);
  
      sketch.textFont(font);
      sketch.textAlign(sketch.LEFT, sketch.TOP); 
      panel.textFont(font);
      panel.textAlign(sketch.LEFT, sketch.TOP);
  
      panel.background(0);
      
      input = new p5.AudioIn();
      osc = new p5.Oscillator();
      input.start();
  
      fft = new p5.FFT(0.5, 1024);
      fft.setInput(input);
    }
  
    // ============================================================== //
    sketch.draw = function() {
      sketch.translate(-sketch.width/2,-sketch.height/2,0);
      drawShader(panel);
      sketch.image(panel, 0, 0, ww, hh);
      sketch.text('WebGL Shader', 15, 15);
    }
  
    // ============================================================== //
    let drawShader = function(panel) {
      shader.setUniform("iResolution", [panel.width * pixelRatio, panel.height * pixelRatio]);
      shader.setUniform("iTime", sketch.millis() * 0.002);
      panel.shader(shader);
  
      // panel.translate(-panel.width/2,-panel.height/2,0);
      panel.rect(-panel.width/2,-panel.height/2,panel.width, panel.height);
    }
  }