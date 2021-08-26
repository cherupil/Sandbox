precision mediump float;

void main() {
	float sideLength = 0.25;
	float diagonal = sqrt(pow(sideLength, 2.0) + pow(sideLength, 2.0));
	float total = sqrt(pow(diagonal, 2.0) + pow(diagonal, 2.0));
	float diff = ((total / 2.0) + gl_FragCoord.z) / total;
	vec3 front = vec3(2.0 - diff, 1.25 - diff, 1.5 - diff);
	vec3 back = vec3(0.0, 0.0, 0.0);
	vec3 final = mix(back, front, 2.25 - diff);
	vec3 depth = vec3(pow(1.9 - diff, 8.0));
	gl_FragColor = vec4(final + depth, 1.0);
	//gl_FragColor = vec4(final, 1.0);
}