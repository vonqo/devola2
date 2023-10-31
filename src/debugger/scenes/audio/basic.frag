#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform float iTime;

void main() {
	vec2 uv = gl_FragCoord.xy / iResolution.xy;
	uv.y = 1.0 - uv.y;

	vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
	gl_FragColor = vec4(col,1.0);
}