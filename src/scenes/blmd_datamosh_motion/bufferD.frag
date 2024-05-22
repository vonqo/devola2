#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform sampler2D iChannel2;
uniform sampler2D iChannel1;
uniform sampler2D iChannel0;
uniform int iFrame;

// How big of a block to move around (1 for individual pixels)
#define BLOCKDIM 12

// Check ITERS * STRIDE pixels in each direction for match
#define ITERS 4
#define STRIDE 2

// How slow the image should refresh (1 = never)
#define DECAY 0.99

void main()
{
    vec2 uv = gl_FragCoord.xy/iResolution.xy;
    uv.y = 1.0 - uv.y;

    vec2 d = 1.0/iResolution.xy;
    
    // if (iFrame < 5 || texelFetch(iChannel3, ivec2(82, 0), 0).x != 0.0) {
    //     // Start off with webcam data (or reset if r held down)
    //     gl_FragColor = texture2D(iChannel2, uv);
    //     return;
    // } 
    // else if (texelFetch(iChannel3, ivec2(32, 0), 0).x != 0.0) {
    //     // If space is held down then pause tracking
    //     gl_FragColor = texture2D(iChannel1, uv);
    //     return;
    // } else if (iMouse.z > 0.0 && distance(gl_FragCoord, iMouse.zw) < 10.0) {
    //     // Place a tracking dot on click
    //     gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    //     return;
    // }
    
    // Move current buffer by pointer from tracking data
    vec2 pointer = texture2D(iChannel0, uv / float(BLOCKDIM)).xy - 0.5;
    gl_FragColor = texture2D(iChannel1, uv + pointer) * float(DECAY) + texture2D(iChannel2, uv) * (1.0 - float(DECAY));
}