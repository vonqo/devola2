const buska = function(sketch) {

  let ww;
  let hh;
  let imgBg;

  // ============================================================== //
  sketch.preload = function() {
      ww = localStorage.getItem('width');
      hh = localStorage.getItem('height');
      imgBg = sketch.loadImage('scenes/buska/buska.png');
  }

  // ============================================================== //
  sketch.setup = function() {
      sketch.createCanvas(Number(ww), Number(hh));
      sketch.noLoop();
  }

  // ============================================================== //
  sketch.draw = function() {
    sketch.image(imgBg, 0, 0, ww, hh);
  }
}