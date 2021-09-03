attribute vec4 aPosition;
attribute vec3 aColor;

uniform mat4 uMatrix;
uniform float uTime;

varying vec3 vColor;

void main() {
	vec4 position = uMatrix * aPosition;
	/* position.x += sin(16.0 * position.z + uTime) / 100.0;
	position.y += sin(16.0 * position.x + uTime) / 100.0;
	position.z += sin(16.0 * position.y + uTime) / 100.0; */
	gl_Position = position;
	vColor = aColor;
}