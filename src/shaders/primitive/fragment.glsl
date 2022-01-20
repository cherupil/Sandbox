precision mediump float;

varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vPos;

void main() {
	float distance = 0.25 + (1.0 - 0.25) * (vPos.z - (-1.0)) / (1.0 - (-1.0));
	vec3 green = vec3(0.420, 0.831, 0.565) * distance;

	gl_FragColor = vec4(green, 1.0);
}