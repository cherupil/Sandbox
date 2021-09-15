precision mediump float;

varying vec3 vNormal;
varying vec2 vUV;

void main() {
	gl_FragColor = vec4(vUV, 0.0, 1.0);
}