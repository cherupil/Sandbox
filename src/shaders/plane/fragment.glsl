precision mediump float;

uniform float uRed;
uniform float uGreen;
uniform float uBlue;

void main() {
	vec3 outer = vec3(uRed/2.0, uGreen/4.0, uBlue/4.0);
	vec3 inner = vec3(uRed/8.0, uGreen/16.0, uBlue/16.0);
	vec2 center = vec2(0.5);
	vec2 st = gl_FragCoord.xy/vec2(1890.0, 1890.0);
	float dist = distance(st, center) * 8.0;
	vec3 mixed = mix(outer, inner, dist);
	gl_FragColor = vec4(mixed, 1.0);
}