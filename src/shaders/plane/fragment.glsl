precision mediump float;

uniform sampler2D uTexture;

varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vSurfaceToLight;
varying vec3 vSurfaceToCamera;

void main() {
	vec3 normal = normalize(vNormal);
	vec3 surfaceToLight = normalize(vSurfaceToLight);
	vec3 surfaceToCamera = normalize(vSurfaceToCamera);
	vec3 halfVector = normalize(vSurfaceToLight + vSurfaceToCamera);
	vec4 texture = texture2D(uTexture, vUV);
	vec4 uvs = vec4(vUV, 0.0, 1.0);
	float light = dot(normal, surfaceToLight);
	float specular = 0.0;
	if (light > 0.0) {
		specular = pow(dot(normal, halfVector), 16.0);
	}
	gl_FragColor = texture;
	gl_FragColor.rgb += gl_FragColor.rgb * ((light + 1.0) * 0.5);
	gl_FragColor.rgb += specular;
}