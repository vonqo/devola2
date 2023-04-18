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