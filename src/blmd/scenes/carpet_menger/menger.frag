#define PI 3.1415926

const float it = 5.0; // Number of iterations

vec2 rotate(vec2 pos, float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat2(c, s, -s, c) * pos;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    fragColor=vec4(0);
    float mx = max(iResolution.x, iResolution.y);
   
    vec2 uv = fragCoord.xy/min(iResolution.x,iResolution.y);
    uv.x -= 0.40;
    
	vec2 q= fragCoord/iResolution.xy;
   
    float t=iTime;
	   
    // let's rotate ... 2D! gtr
    if(iMouse.z>0.)  uv = rotate( uv*2.-1.,sin(t/2.));
    // if(iMouse.z>0.)  uv = rotate( uv*2.-1.,1.);
	
	float v = pow(3.0,it)+10.0;

	for (float i = 0.0; i < it; i++)
	{
		if(floor(mod(uv.x*v,3.0))==1.0 && floor(mod(uv.y*v,3.0))==1.0){
	 
        // Fabrice..     
        fragColor = vec4(sin(i*uv.y-t*0.5+vec4(3,4,5,0)*PI/3.)+1.);
		                             
	    fragColor *= vec4(texture(iChannel0,uv).xyz,1.0)*3.;
                
        }
		v/=3.0;	
		uv.x =uv.x+t/5.;// let's scrolling gtr 
       
	}
     fragColor *= vec4(texture(iChannel2,q).xyz,1.0);
    
}