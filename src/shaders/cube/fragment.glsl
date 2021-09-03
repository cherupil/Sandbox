precision mediump float;

uniform float uRed;
uniform float uGreen;
uniform float uBlue;

varying vec3 vColor;

void main() {
	gl_FragColor = vec4(vColor, 1.0);
}