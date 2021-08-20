precision mediump float;

uniform vec2 uResolution;

varying vec4 vPos;

void main() {
	vec2 fragmentPos = gl_FragCoord.xy / uResolution;
	gl_FragColor = vec4(fragmentPos.x, fragmentPos.y, 0.0, 1.0);
}