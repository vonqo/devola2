const graphicsDebug = function(sketch) {

    let scrblrs = [];
    const COLS = [
        '#3c3d3f',
        '#f14c00',
        '#ffffff',
        '#00e0bf',
        '#f14c00',
        '#f14c00',
    ];

    const pixelRatio = window.devicePixelRatio;

    // ============================================================== //
    sketch.preload = function() {
        ww = 400;
        hh = 400;
    }

    // ============================================================== //
    sketch.setup = function() {
        sketch.createCanvas(Number(ww), Number(hh));
        sketch.background(13, 17, 23);

        for(let i=0; i < 32; i++) {
            scrblrs.push(new Scribbler(sketch.width/2, sketch.height /2));
        }

    }

    // ============================================================== //
    sketch.draw = function() {
        sketch.background(COLS[0]);
        for(const scrblr of scrblrs){
            scrblr.update();
            scrblr.display();
        }
    }

    // ============================================================== //
    class Scribbler {
	    constructor(x, y) {
            this.cX = x;
            this.cY = y;
            this.minRadius = 25;
            this.maxRadius = sketch.min(sketch.width, sketch.height) * 0.4;
            
            this.isMovingAngle = false;
            this.radius = sketch.random(this.minRadius, this.maxRadius);
            this.angle = sketch.random(sketch.TWO_PI);
            this.angleV = 0;
            this.radiusV = 0;
            this.randomVelocities();
    
            this.strokeW = sketch.random(1,2.5);
            this.strokeC = COLS[sketch.floor(sketch.random(1,COLS.length))];
		
		    this.cache = [];
            this.cacheCapacity = 120;
            
            this.cycle = sketch.floor(sketch.random(200,300));
            this.rotateAngle = sketch.random(sketch.TAU);
            this.rotateAngleTarget = this.rotateAngle + sketch.random(-1, 1);
            this.ratio = 0;
            this.frameOffset = sketch.floor(sketch.random(this.cycle));
        }
	
  
        update() {
		    //pos
            let curX = (sketch.cos(this.angle) * this.radius);
            let curY = (sketch.sin(this.angle) * this.radius);
            this.cache.push(sketch.createVector(curX,curY));
		    if(this.cache.length > this.cacheCapacity) this.cache.shift();

		    //param
            if(this.isMovingAngle) {
                this.angle += this.angleV;
            } else {
                if(this.radius < this.minRadius && this.radiusV < 0) this.radius += 0;
                else this.radius += this.radiusV * (1 + this.radius * 0.005);
            } 
            if(sketch.random(1) > 0.9) {
                this.swapMode();
            }
		
            //time
            const count = sketch.frameCount + this.frameOffset;
            const cycleRatio = (count % this.cycle) / this.cycle;
            const cycleRatioMult = sketch.min(cycleRatio * 4, 1);
            const cycleRatioEased = easingEaseInOutCubic(cycleRatioMult);
            this.ratio = cycleRatioEased;
            if(count % this.cycle == 0){
                this.rotateAngle = this.rotateAngleTarget;
                this.rotateAngleTarget = this.rotateAngle + sketch.random(-1, 1);
            }
        }
	
	    display() {
            let rotateAngle = sketch.lerp(this.rotateAngle, this.rotateAngleTarget, this.ratio);
            let vertRatio =  1 + sketch.sin((this.ratio) * sketch.TAU) * 0.01;
            sketch.stroke(this.strokeC);
            sketch.strokeWeight(this.strokeW);
            sketch.noFill();
            sketch.push();
            sketch.translate(this.cX, this.cY);
            sketch.rotate(rotateAngle);
            sketch.beginShape();
            for(const p of this.cache){
                sketch.vertex(p.x * vertRatio, p.y* vertRatio);
            }
            sketch.endShape();
            sketch.pop();
	    }
  
        swapMode() {
            this.isMovingAngle = !this.isMovingAngle;
            this.randomVelocities();
        }
  
        randomVelocities() {
            const angleSP = 0.05;
            const radiusSP = 2;
            this.angleV = sketch.random() > 0.5 ? sketch.random(-angleSP, -angleSP * 0.1) : sketch.random(angleSP, angleSP * 0.1) ;
            if(this.radius < this.minRadius) this.radiusV =  sketch.random(radiusSP * 0.1, radiusSP);
            else if(this.radius > this.maxRadius) this.radiusV =  sketch.random(-radiusSP, -radiusSP * 0.1);
            else this.radiusV = sketch.random() > 0.5 ? sketch.random(radiusSP * 0.1, radiusSP) : sketch.random(-radiusSP, -radiusSP * 0.1);
        }
    }

    function easingEaseInOutCubic (x) {
        if(x < 0.5) return 0.5 * sketch.pow(2*x, 3);
        else return 0.5 * sketch.pow(2*(x-1), 3) + 1;
    }
}