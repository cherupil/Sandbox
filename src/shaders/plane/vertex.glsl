attribute vec4 aPosition;
attribute vec3 aNormal;
attribute vec2 aUV;

uniform mat4 uViewProjectionMatrix;
uniform mat4 uNormalMatrix;
uniform mat4 uLocalMatrix;
uniform vec3 uPointLight;
uniform vec3 uCameraPosition;
uniform float uTime;

varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vSurfaceToLight;
varying vec3 vSurfaceToCamera;

void main() {
	vec4 position = uViewProjectionMatrix * aPosition;
	vec3 surfacePosition = (uLocalMatrix * aPosition).xyz;
	gl_Position = position;
	vNormal = mat3(uNormalMatrix) * aNormal;
	vUV = aUV;
	vSurfaceToLight = uPointLight - surfacePosition;
	vSurfaceToCamera = uCameraPosition - surfacePosition;
}