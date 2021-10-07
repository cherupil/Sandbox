precision mediump float;

uniform sampler2D uTexture;
uniform vec3 uPlaneColor;

varying vec2 vUV;

void main() {
	vec4 uvs = vec4(vUV, 0.0, 1.0);
	gl_FragColor = vec4(uPlaneColor, 1.0);
}