const title = function(sketch) {

  let ww;
  let hh;
  let imgLogo;

  // ============================================================== //
  sketch.preload = function() {
      ww = localStorage.getItem('width');
      hh = localStorage.getItem('height');
      imgLogo = sketch.loadImage('scenes/title/starfish_logo.png');
  }

  // ============================================================== //
  sketch.setup = function() {
      sketch.createCanvas(Number(ww), Number(hh));
      sketch.background(252,252,252);
  }

  // ============================================================== //
  sketch.draw = function() {
    let sizeW = 2895 * 0.3;
    let sizeH = 1238 * 0.3;
    
    let topOffset = 120;

    sketch.image(imgLogo, ww / 2 - (sizeW / 2), hh / 2 - (sizeH / 2) - topOffset, sizeW, sizeH);
  }
}