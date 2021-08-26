attribute vec4 aPosition;

uniform mat4 uMatrix;

void main() {
	vec4 position = uMatrix * aPosition;
	gl_Position = position;
}