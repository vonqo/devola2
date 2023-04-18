#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform int iFrame;
uniform float iTime;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;

#define TAU 6.2831853071

void main()
{
    // Normalize pixel coordinates (0-1)
    vec2 uv = gl_FragCoord.xy/iResolution.xy;

    // textures
    float o = texture2D(iChannel1, uv * 0.25 + vec2(0.0, iTime * 0.025)).r;
    float d = (texture2D(iChannel0, uv * 0.25 - vec2(0.0, iTime * 0.02 + o * 0.02)).r * 2.0 - 1.0);

    // aurora
    float v = uv.y + d * 0.1;
    v = 1.0 - abs(v * 2.0 - 1.0);
    // v = pow(v, 2.0 + sin((iTime * 0.2 + d * 0.25) * TAU) * 0.5);
    v = pow(v, 2.0 + sin((iTime * 0.2 + d * 0.25) * TAU) * 1.5);
    
    vec3 color = vec3(0.0);
    
    float x = (1.0 - uv.x * 0.75);
    float y = 1.0 - abs(uv.y * 2.0 - 1.0);
    color += vec3(x * 0.5, y, x) * v;
    
    // stars
    vec2 seed = gl_FragCoord.xy;
    
    vec2 r;
    r.x = fract(sin((seed.x * 12.9898) + (seed.y * 78.2330)) * 43758.5453);
    r.y = fract(sin((seed.x * 53.7842) + (seed.y * 47.5134)) * 43758.5453);

    float s = mix(r.x, (sin((iTime * 2.5 + 60.0) * r.y) * 0.5 + 0.5) * ((r.y * r.y) * (r.y * r.y)), 0.04); 
    color += pow(s, 70.0) * (1.0 - v);
    
    gl_FragColor.rgb = color;
    gl_FragColor.a = 1.0;
}