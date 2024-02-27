#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform int iFrame;
uniform float iTime;
uniform sampler2D iChannel0;
uniform float glitcher;

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
	uv.y = 1.0 - uv.y;

	vec3 color = 0.5 + 0.5 * cos(iTime+uv.xyx+vec3(0.1, 0.2, 0.4));
	// vec3 color = 0.5 + 0.5 * cos(iTime+uv.xyx+vec3(0.1, 0.2, 0.4));	
	// gl_FragColor = vec4(color,1.0);

	// rgb 11, 17, 325
	gl_FragColor = vec4(0.04, 0.06, 0.13, 1.0);
}