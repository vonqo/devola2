#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform int iFrame;
uniform float iTime;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform float energyBass;

vec2 getDistortion(vec2 uv, float d, float t) {
	uv.x += cos(d) + t * 0.9;
	uv.y += sin(d + t * 0.75);
	return uv;
}

vec4 getDistortedTexture(sampler2D iChannel, vec2 uv) {
	vec4 rgb = texture2D(iChannel, uv);
	return rgb;
}

void main() {
	vec2 uv = gl_FragCoord.xy/iResolution.xy;
	float t = iTime;
	// vec2 mid = vec2(0.5,0.5);
	vec2 focus = iMouse.xy / iResolution.xy;
	float d1 = distance(focus+sin(t * 0.1) * 0.25,uv) * 3.0;	
	float d2 = distance(focus+cos(t),uv) * 2.0;	
	vec4 rgb = (getDistortedTexture(iChannel0, getDistortion(uv, d1, t)) + getDistortedTexture(iChannel1, getDistortion(uv, -d2, t))) * 0.5;
	// rgb.r /= d2;
	// rgb.g += -0.5 + d1;
	// rgb.b = -0.5 + (d1 + d2) / 2.0;
	gl_FragColor = rgb;
}