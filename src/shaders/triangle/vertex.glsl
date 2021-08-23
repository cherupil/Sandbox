attribute vec4 aPosition;
attribute vec3 aColor;

uniform mat4 uMatrix;

varying vec3 vColor;

void main() {
	vec4 position = uMatrix * aPosition;
	gl_Position = position;

	vColor = aColor;
}