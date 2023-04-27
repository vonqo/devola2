// Created by Stephane Cuillerdier - Aiekick/2015
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform int iFrame;
uniform float iTime;
uniform float energyBass;

float dstepf = 0.0;
    
const vec2 RMPrec = vec2(.8, 0.01); 
const vec3 DPrec = vec3(0.01, 12., 1e-8); 

vec2 Params; // y => Elevation

vec4 map(vec3 p)
{
    vec2 uv = p.xz*20.;
    
	////////////////////////////////////////////////////////////////////////////////
    // pattern : iq shader https://www.shadertoy.com/view/Ml2GWy
    uv += iTime*5.;

    vec3 col = vec3(0.0);
    for( int i=0; i<3; i++ ) 
    {
        vec2 a = floor(uv);
        vec2 b = fract(uv);
        
        vec4 w = fract((sin(a.x*7.0+31.0*a.y + 0.01*iTime)+vec4(0.035,0.01,0.0,0.7))*13.545317); // randoms
                
        col += w.xyz *                                   // color
               smoothstep(0.45,0.55,w.w) *               // intensity
               sqrt( 16.0*b.x*b.y*(1.0-b.x)*(1.0-b.y) ); // pattern
        
        uv /= 1.7; // lacunarity
        col /= 2.5; // attenuate high frequencies
    }
    
    col = pow( 2.5*col, vec3(0.9,2.2,3.2) );    // contrast and color shape
    ////////////////////////////////////////////////////////////////////////////////
    
    dstepf += 0.005;

    float disp = dot(col,vec3(Params.y));                            
    float dist = length(p) -3.5 - smoothstep(0., 1., disp);
    //////////////////////// !! /// change this value
    
    return vec4(dist, col.rgb);
}

vec3 nor( vec3 pos, float prec )
{
    vec2 e = vec2( prec, 0. );
    vec3 n = vec3(
    map(pos+e.xyy).x - map(pos-e.xyy).x,
    map(pos+e.yxy).x - map(pos-e.yxy).x,
    map(pos+e.yyx).x - map(pos-e.yyx).x );
    return normalize(n);
}

vec3 cam(vec2 uv, vec3 ro, vec3 cu, vec3 cv)
{
	vec3 rov = normalize(cv-ro);
    vec3 u =  normalize(cross(cu, rov));
    vec3 v =  normalize(cross(rov, u));
    vec3 rd = normalize(rov + u*uv.x + v*uv.y);
    return rd;
}

void main()
{
    vec2 si = iResolution.xy;
   	float t = iTime;
    Params.y = (sin(t*.5)*.5+.5)*.08;
    gl_FragColor = vec4(0.);
    float ca = t*.2; // angle z
    float ce = 3.5; // elevation
    float cd = 0.5; // distance to origin axis
    vec3 cu=vec3(0,1,0);//Change camere up vector here
    vec3 cv=vec3(0,0,0); //Change camere view here
    float refl_i = .6; // reflexion intensity
    float refr_a = 1.2; // refraction angle
    float refr_i = .8; // refraction intensity
    float bii = 0.8; // bright init intensity
    vec2 uv = (gl_FragCoord+gl_FragCoord-si)/min(si.x, si.y);
    vec3 ro = vec3(sin(ca)*cd, ce+1., cos(ca)*cd); //
    vec3 rd = cam(uv, ro, cu, cv);
    float b = bii;
    vec3 d = vec3(0.);
    vec3 p = ro+rd*d.x;
    float s = DPrec.y;
    float rmd = sign(map(p).x);
    float iterUsed = 0.;
    for(int i=0;i<200;i++)
    {      
        iterUsed++;
		if(s<DPrec.x||s>DPrec.y) break;
        s = map(p).x*(s>DPrec.x?RMPrec.x:RMPrec.y);
        if (sign(s) != rmd) break;
        d.y = d.x;
        d.x += s;
        p = ro+rd*d.x;
   	}

    gl_FragColor += pow(b,15.);
    
    if (d.x<DPrec.y)
    {
    	float nPrec = 10./iterUsed;
        vec3 n = nor(p, nPrec);
        vec3 ray = reflect(rd, n);
        // f += texture(i
        // , ray) * refl_i; 
        gl_FragColor.rgb = mix(gl_FragColor.rgb, map(p).yzw,0.5);  
   	}
    else
    {
    	// f = texture(iChannel0, rd);
    }
    
    gl_FragColor += dstepf;
}

