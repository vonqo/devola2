const windows = function(sketch) {

  let points_1 = [];
  let points_2 = [];
  let points_3 = [];

  let textTyped1 = 'FONT';
  let textTyped2 = 'ROBOTO';
  let textTyped3 = 'BOLD.';
  let myFont;
  let fSize = 200;

  // ============================================================== //
  sketch.preload = function() {
    myFont = sketch.loadFont('Roboto-Bold.ttf');
  }

  // ============================================================== //
  sketch.setup = function() {
    sketch.createCanvas(1112, 834);
    sketch.textFont(myFont);
    sketch.noFill();
    sketch.stroke(255);
    sketch.strokeWeight(0.75);
  
    points_1 = myFont.textToPoints(textTyped1, 0, 0, fSize, {
      sampleFactor: 0.2, //ドットの密集度、default=0.1
      simplifyThreshold: 0.0 // increase to remove collinear points default=0.0
    })
    points_2 = myFont.textToPoints(textTyped2, 0, 0, fSize, {
      sampleFactor: 0.2, 
      simplifyThreshold: 0.0 
    })
    points_3 = myFont.textToPoints(textTyped3, 0, 0, fSize, {
      sampleFactor: 0.2, 
      simplifyThreshold: 0.0 
    })
    textSize(200);
  }

  // ============================================================== //
  sketch.draw = function() {
    sketch.background(60);

    sketch.push();
    sketch.translate(170, height/3);
    sketch.stroke(230,230,0);
    sketch.fill(230,230,0,50);
    sketch.text(textTyped1, 0,0);
    sketch.stroke(230,230,0,150);
    sketch.drawText(points_1);
    sketch.translate(0, 170);
    sketch.stroke(255,0,255);
    sketch.fill(255,0,255,50);
    sketch.text(textTyped2, 0,0);
    sketch.stroke(255,0,255,150);
    sketch.drawText(points_2);
    sketch.translate(0, 170);
    sketch.stroke(0,240,240);
    sketch.fill(0,240,240,50);
    sketch.text(textTyped3, 0,0);
    sketch.stroke(0,240,240,150);
    sketch.drawText(points_3);
    sketch.pop();
  }

  // ============================================================== //
  function drawText(array){
    let d = 10 + sin(frameCount / 50) * 50;
    let angle = frameCount / 100;
  
    for(let i=0; i<array.length; i++){
      let p = array[i];
      sketch.push();
      sketch.translate(p.x, p.y);
      sketch.rotate(angle);
      // ellipse(0, 0, 7);
      sketch.line(-d, -d, d, d);
      sketch.pop();
    }
  }

  // ============================================================== //
  sketch.keyTyped = function() {
    
  }
  
}