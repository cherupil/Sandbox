attribute vec4 aPosition;
attribute vec3 aNormal;
attribute vec2 aUV;

uniform mat4 uViewProjectionMatrix;
uniform mat4 uNormalMatrix;
uniform mat4 uLocalMatrix;

varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vPos;

void main() {
	vec4 position = uViewProjectionMatrix * uLocalMatrix * aPosition;
	gl_Position = position;
	vNormal = aNormal + 0.5;
	vUV = aUV;
	vPos = aPosition.xyz;
}