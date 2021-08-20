attribute vec4 aPosition;

uniform mat3 uMatrix;

varying vec4 vPos;

void main() {
	vec2 position = (uMatrix * vec3(aPosition.xy, 1.0)).xy;
	gl_Position = vec4(position, 0.0, 1.0);
	vPos = aPosition;
}