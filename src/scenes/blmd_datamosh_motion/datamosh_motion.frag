#ifdef GL_ES
precision mediump float;
#endif

#define BLOCKDIM 12

uniform vec2 iResolution;
uniform sampler2D iChannel1;
uniform sampler2D iChannel0;

void main()
{
    vec2 uv = gl_FragCoord.xy/iResolution.xy;
    uv.y = 1.0 - uv.y;
    
    // if (texelFetch(iChannel2, ivec2(68, 0), 0).x != 0.0) {
    //     // For debugging, hold space to see raw pointer data
    //     gl_FragColor = (texture2D(iChannel1, uv / float(BLOCKDIM)) - 0.5) * 50.0 + 0.5;
    // } else {
    //     gl_FragColor = texture2D(iChannel0, uv);
    // }

    gl_FragColor = texture2D(iChannel0, uv);
}