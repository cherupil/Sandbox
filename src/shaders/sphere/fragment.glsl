precision mediump float;

varying vec3 vNormal;

void main() {
	vec3 normals = normalize(vNormal) * 0.5 + 0.5;
	gl_FragColor = vec4(normals, 1.0);
}