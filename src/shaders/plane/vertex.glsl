attribute vec4 aPosition;
attribute vec3 aNormal;
attribute vec2 aUV;

uniform mat4 uViewProjectionMatrix;
uniform mat4 uNormalMatrix;
uniform mat4 uLocalMatrix;
uniform float uTime;

varying vec3 vNormal;
varying vec2 vUV;

void main() {
	vec4 position = uViewProjectionMatrix * aPosition;
	gl_Position = position;
	vNormal = aNormal;
	vUV = aUV;
}