precision mediump float;

uniform sampler2D uTexture;
uniform vec3 uLightDirection;

varying vec3 vNormal;
varying vec2 vUV;

void main() {
	vec3 normal = normalize(vNormal);
	vec4 texture = texture2D(uTexture, vUV);
	vec4 uvs = vec4(vUV, 0.0, 1.0);
	vec3 color = vec3(0.2, 1.0, 0.2);
	float light = dot(normal, uLightDirection);
	gl_FragColor = vec4(color, 1.0);
	gl_FragColor.rgb *= light;
}