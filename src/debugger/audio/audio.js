const audioDebug = function(sketch) {

  let font;
  let fft;
  let osc;
  let input;

  let ww;
  let hh;

  let panel1;
  let panel2;
  let panel3;

  const lineR = 241;
  const lineG = 75;
  const lineB = 0;

  const bgColor = sketch.color(60, 61, 63);

  // ============================================================== //
  sketch.preload = function() {
    ww = 400;
    hh = 600;
    font = sketch.loadFont('../assets/font/JetBrainsMono/JetBrainsMono-Medium.ttf');
  }

  // ============================================================== //
  sketch.setup = function() {
    sketch.createCanvas(Number(ww), Number(hh), sketch.WEBGL);
    sketch.background(bgColor);
    sketch.imageMode(sketch.CORNER);

    gl = this.canvas.getContext('webgl');
    gl.disable(gl.DEPTH_TEST);

    panel1 = sketch.createGraphics(ww, 200);
    panel2 = sketch.createGraphics(ww, 200);
    panel3 = sketch.createGraphics(ww, 200);

    sketch.textFont(font);
    sketch.textAlign(sketch.LEFT, sketch.TOP); 
    panel1.textFont(font); 
    panel2.textFont(font);
    panel3.textFont(font); 
    panel1.textAlign(sketch.LEFT, sketch.TOP); 
    panel2.textAlign(sketch.LEFT, sketch.TOP);
    panel3.textAlign(sketch.LEFT, sketch.TOP);

    panel1.background(bgColor);
    panel2.background(bgColor);
    panel3.background(bgColor);

    panel2.noFill();
    panel2.stroke(lineR,lineG,lineB);
    
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

    drawWaveform(panel2, waveform);
    drawEnergy(panel3, spectrum);
    drawFFTSpectrograph(panel1, spectrum);

    sketch.image(panel2, 0, 0, ww, 200);
    sketch.image(panel3, 0, 200, ww, 200);
    sketch.image(panel1, 0, 400, ww, 200);

    sketch.text('Oscilloscope (Waveform)', 15, 15);
    sketch.text('Energy', 15, 215);
    sketch.text('Spectograph', 15, 415);
  }

  // ============================================================== //
  let spectrographSpeed = 5;
  // bass = [20, 140];
  // lowMid = [140, 400];
  // mid = [400, 2600];
  // highMid = [2600, 5200];
  // treble = [5200, 14000]; 

  // ============================================================== //
  let drawFFTSpectrograph = function(panel, spectrum) {
    panel.noStroke();
    panel.copy(panel, 0, 0, ww, 200, -spectrographSpeed, 0, ww, 200);
    
    for (var i = 0; i < spectrum.length; i++) {
      var value = spectrum[i] * 0.1;
      panel.fill(60 + ((lineR - 60) * value), 61 + ((lineG - 61) * value), 63 + ((lineB - 63) * value), 255);

      var percent = i / spectrum.length;
      var y = percent * 200;
      panel.rect(ww - spectrographSpeed, 200 - y, spectrographSpeed, 200 / spectrum.length);
    }
  }

  // ============================================================== //
  let drawWaveform = function(panel, waveform) {
    var bufLen = waveform.length;
    panel.background(bgColor);
    
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
    panel.background(bgColor);

    bass = fft.getEnergy("bass");
    lowMid = fft.getEnergy("lowMid");
    mid = fft.getEnergy("mid");
    highMid = fft.getEnergy("highMid");
    treble = fft.getEnergy("treble");

    let bins=[bass,lowMid,mid,highMid,treble];

    for (var i =0;i<5;i++){
      panel.fill(lineR, lineG, lineB);
      panel.rect((i*panel.width/5)+10, panel.height - 30, 30, panel.map(bins[i], 0, 255, 0,-panel.height - 20));
    }

    panel.beginShape();
    panel.stroke(lineR, lineG, lineB);
    panel.noFill();
    for (var i = 0; i < spectrum.length; i++) {
      let x, y;
      x = panel.map(i, 0, spectrum.length - 1, 0, panel.width);
      y = panel.map(spectrum[i], 20, 255, panel.height - 30, 0);
      panel.vertex(x, y);
    }
    panel.endShape();
  }
}