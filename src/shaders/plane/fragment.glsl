precision mediump float;

uniform sampler2D uTexture;
uniform vec3 uPlaneColor;
uniform float uPickingColor;

varying vec3 vNormal;
varying vec2 vUV;

void main() {
	gl_FragColor = vec4(vNormal + uPlaneColor, 1.0);
}