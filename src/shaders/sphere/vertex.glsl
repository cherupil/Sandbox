attribute vec4 aPosition;
attribute vec3 aNormal;

uniform mat4 uMatrix;
uniform float uTime;

varying vec3 vNormal;

void main() {
	vec4 position = uMatrix * aPosition;
	gl_Position = position;
	vNormal = aNormal;
}