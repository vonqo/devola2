const audio = function(sketch) {

  let fft;
  let input;

  let ww;
  let hh;

  // ============================================================== //
  sketch.preload = function() {
    ww = localStorage.getItem('width');
    hh = localStorage.getItem('height');
  }

  // ============================================================== //
  sketch.setup = function() {
    sketch.createCanvas(Number(ww), Number(hh), sketch.WEBGL);
    
    input = new p5.AudioIn();
    input.start();

    fft = new p5.FFT();
    fft.setInput(input);
  }

  // ============================================================== //
  sketch.draw = function() {
    sketch.background(220);

    let spectrum = fft.analyze();
    // let bass = fft.getEnergy("bass");

    sketch.noStroke();
    sketch.fill(255, 0, 255);
    for (let i = 0; i< spectrum.length; i++){
      let x = sketch.map(i, 0, spectrum.length, 0, sketch.width);
      let h = -sketch.height + sketch.map(spectrum[i], 0, 255, sketch.height, 0);
      sketch.rect(x, sketch.height, sketch.width / spectrum.length, h )
    }

    let waveform = fft.waveform();
    sketch.noFill();
    sketch.beginShape();
    sketch.stroke(20);
    for (let i = 0; i < waveform.length; i++){
      let x = sketch.map(i, 0, waveform.length, 0, sketch.width);
      let y = sketch.map(waveform[i], -1, 1, 0, sketch.height);
      sketch.vertex(x,y);
    }
    sketch.endShape();

  }

  // ============================================================== //


}