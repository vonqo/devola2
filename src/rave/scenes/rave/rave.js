const rave = function(sketch) {


const frag = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform float iPixelDensity;
uniform sampler2D iCanvas;
uniform sampler2D iImage;
uniform vec2 iMouse;
uniform float iTime;
uniform float iDelta;
uniform float iRandomSeed;

float random(vec2 uv) {
  return fract(sin(dot(uv+iRandomSeed, vec2(500.1234, -500.5678)))*9999.);
}

vec2 displace(vec2 uv, vec2 duv, float off, float wei) {
  //uv.x *= iResolution.x/iResolution.y; // square
  duv -= off;
  return uv-duv*wei;
}

vec4 displace(vec2 uv, sampler2D img, vec2 duv, float off, float wei) {
  duv -= off;
  return texture2D(img, uv-duv*wei);
}

varying vec2 vTexCoord;
void main() {
  vec2 uv = vTexCoord;
  vec2 mouse = iMouse.xy/iResolution.xy;
  uv.y = 1.-uv.y;
  
  vec4 randomImage = vec4(random(uv));
  
  vec2 iYuv = floor( vec2( uv.x, uv.y*(iResolution.y/5.) ) );
  vec4 dimg = vec4(random(iYuv));

  vec2 duv = displace(uv, dimg.rg, 0.5, iDelta);
  duv = displace(duv, randomImage.rg, .5, .005);
  duv = repeat(duv, 1.);
  
  gl_FragColor = texture2D(iCanvas, vec2(duv.x, uv.y))/(dimg.x*4.);
}
`

const vert = `
	#ifdef GL_ES
	precision mediump float;
	#endif

	attribute vec3 aPosition;
	attribute vec2 aTexCoord;

	varying vec2 vTexCoord;

	void main() {
		vTexCoord = aTexCoord;
		vec4 positionVec4 = vec4(aPosition, 1.0);
		positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
		gl_Position = positionVec4;
	}
`
  let theShader;
  let WebGL;
  let Canvas;
  let img;
  let delta = 0;
  let random_seed;

  // ============================================================== //
  sketch.preload = function() {
    theShader = new p5.Shader(this.renderer, vert, frag);
  }

  // ============================================================== //
  sketch.setup = function() {
    sketch.pixelDensity(1);
    WebGL = sketch.createGraphics(1920, 730, sketch.WEBGL);
    Canvas = sketch.createGraphics(1920, 730);
    
    random_seed = sketch.random(0, 30);
    Canvas.background(0);
    let step = 0;
    for (let y = 2.5; y < sketch.height; y += 5) {
      for (let x = 2.5; x < sketch.width; x += 5) {
        Canvas.noStroke();
        Canvas.rectMode(sketch.CENTER);
        if (sketch.random(0,1) < 0.01) { Canvas.fill(255, 0, 0); }
        else { Canvas.fill( sketch.random(255) ); }
        Canvas.rect(x, y, Canvas.noise(step)*5);
        step += 0.08;
      }
    }
  }

  function initUniforms() {
    theShader.setUniform('iResolution', [sketch.width, sketch.height]);
    theShader.setUniform('iPixelDensity', sketch.pixelDensity());
    theShader.setUniform('iCanvas', Canvas);
    theShader.setUniform('iImage', img);
    theShader.setUniform('iMouse', [sketch.mouseX, sketch.mouseY]);
    theShader.setUniform('iTime', sketch.frameCount);
    theShader.setUniform('iDelta', delta);
    theShader.setUniform('iRandomSeed', random_seed);
  }

  // ============================================================== //
  sketch.draw = function() {
    delta += sketch.map(sketch.mouseX, 0, sketch.width, 0.1, -0.1);
	
    WebGL.shader(theShader);
    initUniforms();
    WebGL.rect(0, 0, sketch.width, sketch.height);
    sketch.image(WebGL, 0, 0);
  
    // ClickStop();
  }

  // ============================================================== //
  sketch.keyTyped = function() {

  }
  
}