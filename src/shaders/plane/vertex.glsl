attribute vec4 aPosition;

uniform mat4 uMatrix;
uniform float uTime;

void main() {
	vec4 position = uMatrix * aPosition;
	float zToDivideBy = 1.0 + position.z * 0.0;
	position.x += sin(position.y * 24.0 + (uTime * 1.0)) / 160.0;
	position.y += sin(position.z * 40.0 + (uTime * 1.1)) / 160.0;
	position.z += sin(position.x * 32.0 + (uTime * 1.2)) / 160.0;
	gl_Position = vec4(position.xy / zToDivideBy, position.zw);
}