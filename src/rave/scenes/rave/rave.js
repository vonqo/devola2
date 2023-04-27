const toneWave2 = function(sketch) {
  let gl;
  let noctaves;
  let colors;

  const bassEnergyRange = {
      low: 130,
      high: 255
  };

  let fft;
  let input;

const frag=`
// Author Pierre MARZIN 01/2017
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform int noctaves;
uniform float c[22];

uniform float tintRed;
uniform float tintGreen;
uniform float tintBlue;

float mousefactor;
float noise( in vec2 x )
{
return sin(0.5*x.x)*sin(0.5*x.y);
}
const mat2 rot = mat2( 0.80,  0.6, -0.6,  0.8 );
float fbm ( in vec2 _st) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = 10.0*vec2(c[11],c[12]);
  for (int i = 0; i < 11; ++i) {//noprotect
  if(i>=noctaves)break;
      v += a * noise(_st);
      _st = rot*_st* 2.7 + shift;
      a *= 0.7;
  }
  return v;
}
void main() {
  vec2 mouse=iMouse/iResolution;
  vec2 st =(-iResolution.xy+2.0*gl_FragCoord.xy)/iResolution.y;//(gl_FragCoord.xy/iResolution.xy);//
  vec3 color = vec3(0.);
  vec2 q = vec2(0.);
  q.x = fbm( st+vec2(c[0],c[1]*.01*iTime) );
  q.y = fbm( st+vec2(c[2],c[3]) );
  vec2 r = vec2(0.);
  //play with the values here!
  r.x = fbm( st+ (3.0*mouse.x+0.4)*q+vec2(c[5],c[6]));
  r.y = fbm( st+ (6.0*mouse.y+0.5)*q*sin(.01*iTime)+vec2(c[8]*.05*iTime,c[9]));
  float f = fbm(st+c[10]*(r+length(q) ));
  color = smoothstep(vec3(0.101961,0.19608,0.666667),vec3(0.666667,0.666667,0.98039),color);
  color = mix(color,vec3(1.856,.05*(1.0+cos(1.5+.2*iTime)),0.164706),r.y+length(q));//
  color = mix(color,vec3(1.5*sin(.12*iTime),0.0,cos(1.13*iTime)),length(r+q));//.2+.2*(1.0+cos(0.5+.3*iTime))
  color = mix(color, vec3(0.3,0.4,0.8), dot(r,r));
  color*=(1.5*f*f*f+1.8*f*f+1.7*f);
  color+=.4*vec3(1.8+r.x,0.7+q);
  color=pow(color, vec3(.4));

  //tinting

  // color[0] = color[0] + (1.0 - color[0]) * (color[0] / tintRed);
  // color[1] = color[1] + (1.0 - color[1]) * (tintGreen / color[1]);
  // color[2] = color[2] + (1.0 - color[2]) * (tintBlue / color[2]);

  // color[0] = mix(1.0, color[0], 1.0) * (tintRed / 1.0);
  // color[1] = mix(1.0, color[1], 1.0) * (tintGreen / 1.0);
  // color[2] = mix(1.0, color[2], 1.0) * (tintBlue / 1.0);

  color[0] = color[0] * (tintRed / 1.0);
  color[1] = color[1] * (tintGreen / 1.0);
  color[2] = color[2] * (tintBlue / 1.0);

  gl_FragColor = vec4(color,1.4);
}
`
const vert=`
//standard vertex shader
#ifdef GL_ES
    precision highp float;
  #endif
  #extension GL_OES_standard_derivatives : enable
  // attributes, in
  attribute vec3 aPosition;
  attribute vec3 aNormal;
  attribute vec2 aTexCoord;
  attribute vec4 aVertexColor;
  // attributes, out
  varying vec3 var_vertPos;
  varying vec4 var_vertCol;
  varying vec3 var_vertNormal;
  varying vec2 var_vertTexCoord;
  
  // matrices
  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;
  uniform mat3 uNormalMatrix;
  void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
    // just passing things through
    var_vertPos      = aPosition;
    var_vertCol      = aVertexColor;
    var_vertNormal   = aNormal;
    var_vertTexCoord = aTexCoord;
  }
`;

  // ============================================================== //
  function initColors() {
      // for (let i = -10; i < 50; i++) {
      //     colors[i] = i;
      // }
      colors = [100];
  }

  // ============================================================== //
  sketch.setup = function() {
      sketch.createCanvas(1920, 1080, sketch.WEBGL);
      pg = sketch.createGraphics(1920, 1080, sketch.WEBGL);
      
      input = new p5.AudioIn();
      input.start();
      
      gl = this.canvas.getContext('webgl');
      gl.disable(gl.DEPTH_TEST);
      
      noctaves = 2;
      colors = [];
      
      initColors();
      test = new p5.Shader(this._renderer, vert, frag); //shaders are loaded
      sketch.shader(test); //shaders are applied

      fft = new p5.FFT(0.8, 256);
      fft.setInput(input);
  }

  const tintColor = sketch.color(12, 10, 255);

  // ============================================================== //
  sketch.draw = function() {
      let spectrum = fft.analyze();
      
      // "bass", "lowMid", "mid", "highMid", "treble"
      let bass = fft.getEnergy("bass");
      let energyBass = sketch.map(bass, bassEnergyRange.low, bassEnergyRange.high, 0, sketch.width, true);
      
      test.setUniform("iResolution", [sketch.width, sketch.height]); //pass some values to the shader
      test.setUniform("iTime", sketch.millis() * 0.001);
      test.setUniform('iMouse', [energyBass, 0]);
      test.setUniform("noctaves", noctaves);
      test.setUniform("c", colors);

      test.setUniform("tintRed", sketch.red(tintColor) / 255);
      test.setUniform("tintGreen", sketch.green(tintColor) / 255);
      test.setUniform("tintBlue", sketch.blue(tintColor) / 255);
      
      sketch.shader(test);
      sketch.box(sketch.width, sketch.height);
  }

  // ============================================================== //
  sketch.mousePressed = function() {
      // userStartAudio();
  }

  // ============================================================== //
  sketch.keyTyped = function() {
      if(sketch.key === 'q') {
          noctaves = 1;
      } else if(sketch.key === 'w') {
          noctaves = 2;
      } else if(sketch.key === 'e') {
          noctaves = 3;
      } else if(sketch.key === 'r') {
          noctaves = 4;
      } else if(sketch.key === 't') {
          noctaves = 5;
      } else if(sketch.key === 'y') {
          noctaves = 6;
      }
  }

}