const title = function(sketch) {

  let ww;
  let hh;
  let imgLogo;

  let sizeW;
  let sizeH;
  let topOffset = 120;

  let colorR = 220;
  let colorG = 220;
  let colorB = 220;

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
      sizeW = 2895 * 0.3;
      sizeH = 1238 * 0.3;
  }

  // ============================================================== //
  sketch.draw = function() {
    sketch.background(colorR,colorG,colorB);
    sketch.image(imgLogo, ww / 2 - (sizeW / 2), hh / 2 - (sizeH / 2) - topOffset, sizeW, sizeH);
  }
}