attribute vec4 aPosition;

uniform mat4 uMatrix;
uniform float uTime;

void main() {
	vec4 position = uMatrix * aPosition;
	gl_Position = position;
}