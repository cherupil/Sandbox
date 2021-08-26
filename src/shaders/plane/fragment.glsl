precision mediump float;

void main() {
	vec3 outer = vec3(0.5, 0.0625, 0.125);
	vec3 inner = vec3(0.125, 0.015625, 0.03125);
	vec2 center = vec2(0.5);
	vec2 st = gl_FragCoord.xy/vec2(1890.0, 1890.0);
	float dist = distance(st, center) * 8.0;
	vec3 mixed = mix(outer, inner, dist);
	gl_FragColor = vec4(mixed, 1.0);
}