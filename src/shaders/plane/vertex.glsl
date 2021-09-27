attribute vec4 aPosition;
attribute vec3 aNormal;
attribute vec2 aUV;

uniform mat4 uMatrix;
uniform float uTime;

varying vec3 vNormal;
varying vec2 vUV;

void main() {
	vec4 position = uMatrix * aPosition;
	gl_Position = position;
	vNormal = aNormal;
	vUV = aUV;
}