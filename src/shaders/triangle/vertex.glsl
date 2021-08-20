attribute vec4 aPosition;
attribute vec3 aColor;

uniform mat3 uMatrix;

varying vec3 vColor;

void main() {
	vec2 position = (uMatrix * vec3(aPosition.xy, 1.0)).xy;
	gl_Position = vec4(position, 0.0, 1.0);

	vColor = aColor;
}