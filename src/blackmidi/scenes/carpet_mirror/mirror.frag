precision mediump float;
varying vec2 vTexCoord;
uniform sampler2D uTexture;
uniform vec2 uScale;

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;
  vec2 wiggle = sin(uv * uScale) * 0.02;
  
  vec4 color = texture2D(uTexture, uv + wiggle);
  
  // Send the color to the screen
  gl_FragColor = color;
}