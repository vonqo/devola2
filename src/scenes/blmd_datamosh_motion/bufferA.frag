#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform sampler2D iChannel1;
uniform sampler2D iChannel0;
uniform int iFrameMod2;

// Buffers A and B just maintain a copy of the last frame's camera
void main()
{
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    uv.y = 1.0 - uv.y;
    
    if (iFrameMod2 == 0) {
        gl_FragColor = texture2D(iChannel1, uv);
    } else {
        gl_FragColor = texture2D(iChannel0, uv);
    }

    gl_FragColor = texture2D(iChannel1, uv);
}