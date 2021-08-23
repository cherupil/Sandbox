attribute vec4 aPosition;

uniform mat4 uMatrix;

varying vec4 vPos;

void main() {
	vec4 position = uMatrix * aPosition;
	gl_Position = position;
	vPos = aPosition;
}