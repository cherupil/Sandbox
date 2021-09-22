precision mediump float;

uniform sampler2D uTexture;

varying vec3 vNormal;
varying vec2 vUV;

void main() {
	vec4 texture = texture2D(uTexture, vUV);
	vec4 uvs = vec4(vUV, 0.0, 1.0);
	gl_FragColor = texture;
}