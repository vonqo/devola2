#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform int iFrame;
uniform float iTime;
uniform sampler2D iChannel0;
uniform float energyBass;

void main() {
    float mDist = 9999.9;
    vec2 mUv = gl_FragCoord.xy/iResolution.xy;
    int xx = int(gl_FragCoord.x);
    int y = int(gl_FragCoord.y);

    for (int x = 0; x < 2000; x++) {
        if(x >= xx) {
            break;
        }
        
        vec2 uv = vec2(x, y) / iResolution.xy;
        vec2 trueUv = gl_FragCoord.xy / iResolution.xy;
        
        vec3 colTex = texture2D(iChannel0, uv).rgb;
        vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));

        vec3 distVec = abs(colTex - col);
        float dist = (distVec.r + distVec.g + distVec.b) / 3.0;

        if (dist < mDist) {
            mUv = uv;
            mDist = dist;
        }
    }
    
    vec3 col2 = texture2D(iChannel0, mUv).rgb;
    gl_FragColor = vec4(col2, 1.0);
}