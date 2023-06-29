const audio = function(sketch) {

  let font;
  let fft;
  let osc;
  let input;

  let ww;
  let hh;
  let pw;
  let ph;

  let panel1;
  let panel2;
  let panel3;
  let panel4;
  let shader;

  // ============================================================== //
  sketch.preload = function() {
    ww = localStorage.getItem('width');
    hh = localStorage.getItem('height');
    font = sketch.loadFont('../../assets/font/JetBrainsMono/JetBrainsMono-Medium.ttf');
    shader = sketch.loadShader('scenes/audio/basic.vert', 'scenes/audio/basic.frag');
  }

  // ============================================================== //
  sketch.setup = function() {
    sketch.createCanvas(Number(ww), Number(hh), sketch.WEBGL);
    sketch.background(13, 17, 23);
    sketch.imageMode(sketch.CORNER);
    
    pw = (ww - 15) / 2;
    ph = (hh - 15) / 2;

    panel1 = sketch.createGraphics(pw, ph);
    panel2 = sketch.createGraphics(pw, ph);
    panel3 = sketch.createGraphics(pw, ph);
    panel4 = sketch.createGraphics(pw, ph, sketch.WEBGL);

    sketch.textFont(font);
    sketch.textAlign(sketch.LEFT, sketch.TOP); 
    panel1.textFont(font); panel2.textFont(font);
    panel3.textFont(font); panel4.textFont(font);
    panel1.textAlign(sketch.LEFT, sketch.TOP); 
    panel2.textAlign(sketch.LEFT, sketch.TOP);
    panel3.textAlign(sketch.LEFT, sketch.TOP);
    panel4.textAlign(sketch.LEFT, sketch.TOP);

    panel1.background(0);
    panel2.background(0);
    panel3.background(0);
    panel4.background(0);

    panel2.noFill();
    panel2.stroke(0,255,45);
    
    input = new p5.AudioIn();
    osc = new p5.Oscillator();
    input.start();

    fft = new p5.FFT(0.5, 1024);
    fft.setInput(input);
  }

  // ============================================================== //
  sketch.draw = function() {
    sketch.translate(-sketch.width/2,-sketch.height/2,0);

    let spectrum = fft.analyze();
    let waveform = fft.waveform();

    drawFFTSpectrograph(panel1, spectrum);
    drawWaveform(panel2, waveform);
    drawEnergy(panel3, spectrum);
    drawShader(panel4);

    sketch.image(panel1, 5, 5, pw, ph);
    sketch.image(panel2, pw + 10, 5, pw, ph);
    sketch.image(panel3, 5, ph + 10, pw, ph);
    sketch.image(panel4, pw + 10, ph + 10, pw, ph);

    sketch.text('Spectograph', 15, 15);
    sketch.text('Oscilloscope (Waveform)', pw + 20, 15);
    sketch.text('Energy', 15, ph + 20);
    sketch.text('Shader', pw + 20, ph + 20);
  }

  // ============================================================== //
  let spectrographSpeed = 5;
  // bass = [20, 140];
  // lowMid = [140, 400];
  // mid = [400, 2600];
  // highMid = [2600, 5200];
  // treble = [5200, 14000]; 

  let drawFFTSpectrograph = function(panel, spectrum) {
    panel.noStroke();
    panel.copy(panel, 0, 0, pw, ph, -spectrographSpeed, 0, pw, ph);
    
    for (var i = 0; i < spectrum.length; i++) {
      var value = spectrum[i];
      panel.fill(0, value, value * 0.3, 255);

      var percent = i / spectrum.length;
      var y = percent * ph;
      panel.rect(pw - spectrographSpeed, ph - y, spectrographSpeed, ph / spectrum.length);
    }
  }

  // ============================================================== //
  let drawWaveform = function(panel, waveform) {
    var bufLen = waveform.length;
    panel.background(0);
    
    panel.strokeWeight(2);
    panel.beginShape();
    for (var i = 0; i < bufLen; i++){
      var x = panel.map(i, 0, bufLen, 0, panel.width);
      var y = panel.map(waveform[i], -1, 1, -panel.height/2, panel.height/2);
      panel.vertex(x, y + panel.height/2);
    }
    panel.endShape();
  }

  // ============================================================== //
  let drawEnergy = function(panel, spectrum) {
    panel.background(0);

    bass = fft.getEnergy("bass");
    lowMid = fft.getEnergy("lowMid");
    mid = fft.getEnergy("mid");
    highMid = fft.getEnergy("highMid");
    treble = fft.getEnergy("treble");

    let bins=[bass,lowMid,mid,highMid,treble];

    for (var i =0;i<5;i++){
      panel.fill(i+1*(255/5)/255,(i+1)*(255/5),0);
      panel.rect((i*panel.width/5)+10, panel.height/2, 30, panel.map(bins[i], 0, 255, 0,-panel.height/2));
    }

    panel.beginShape();
    panel.stroke(0, 255, 45);
    panel.noFill();
    for (var i = 0; i < spectrum.length; i++) {
      let x, y;
      x = panel.map(i, 0, spectrum.length - 1, 0, panel.width);
      y = panel.map(spectrum[i], 0, 255, panel.height / 2, 0);
      panel.vertex(x, y);
    }
    panel.endShape();
  }

  // ============================================================== //
  let drawShader = function(panel) {
    panel.translate(-panel.width/2,-panel.height/2,0);
    panel.shader(shader);
    // shader.setUniform('u_resolution', [panel.width, panel.height]);
    panel.rect(0,0,panel.width, panel.height);
  }

  // ============================================================== //


}