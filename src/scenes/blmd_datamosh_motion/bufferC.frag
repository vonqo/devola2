#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform sampler2D iChannel3;
uniform sampler2D iChannel2;
uniform sampler2D iChannel1;
uniform sampler2D iChannel0;
uniform int iFrameMod2;

// How big of a block to move around (1 for individual pixels)
#define BLOCKDIM 12

// Check ITERS * STRIDE pixels in each direction for match
#define ITERS 4
#define STRIDE 2

// How slow the image should refresh (1 = never)
#define DECAY 0.99

// Buffer C provides pointers from the previous frame to the current frame
vec2 dim;

vec4 prevTex(vec2 uv) {
    if (iFrameMod2 == 0) {
        return texture2D(iChannel1, uv);
    } else {
        return texture2D(iChannel0, uv);
    }
}

vec4 curTex(vec2 uv) {
    return texture2D(iChannel2, uv);
}

float blockDist(vec2 curUV, vec2 prevUV) {
    float dist = 0.0;
    
    for (int i = 0; i < BLOCKDIM; i++) {
        for (int j = 0; j < BLOCKDIM; j++) {
            vec2 offset = vec2(float(i) * dim.x, float(j) * dim.y);
            dist += distance(curTex(curUV + offset), prevTex(prevUV + offset));
        }
    }
    
    return dist;
}

void main()
{
    vec2 uv = gl_FragCoord.xy / iResolution.xy * float(BLOCKDIM);
    // uv.y = 1.0 - uv.y;

    gl_FragColor = vec4(0.5, 0.5, 0.0, 1.0);
    if (uv.x > 1.0 || uv.y > 1.0) {
        return;
    }
    
    dim = 1.0/iResolution.xy;
    
    float minDist = blockDist(uv, uv) - 0.5; // The -0.5 biases towards no movement a bit to make it more stable
    vec2 minPointer = vec2(0.0, 0.0);
    
    for (int i = 0; i < 8; i++) { // up, up-right, right, down-right, down, down-left, left, up-left
        vec2 dir = vec2(0.0, 0.0);

        if(i == 0) {
            dir.y = dim.y;
        } else if(i == 1) {
            dir.x = dim.x;
            dir.y = dim.y;
        } else if(i == 2) {
            dir.x = dim.x;
        } else if(i == 3) {
            dir.x = dim.x;
            dir.y = -dim.y;
        } else if(i == 4) {
            dir.y = -dim.y;
        } else if(i == 5) {
            dir.x = -dim.x;
            dir.y = -dim.y;
        } else if(i == 6) {
            dir.x = -dim.x;
        } else if(i == 7) {
            dir.x = -dim.x;
            dir.y = dim.y;
        }
        
        for (int j = 1; j <= ITERS; j++) {
            vec2 pointer = dir * float(j * STRIDE);
            float dist = blockDist(uv, uv + pointer);
            if (dist < minDist) {
                minDist = dist;
                minPointer = pointer;
            }
        }
    }
    
    gl_FragColor.xy += minPointer;
}