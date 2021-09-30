import Vector from './Vector.js'

export default class Light {
	constructor(type, vector) {
		this.type = type
		if (this.type === 'directional') {
			this.direction = Vector.normalize([vector[0], vector[1], vector[2]])
		} else if (this.type === 'point') {
			this.position = [vector[0], vector[1], vector[2]]
		}
	}

	/* 
	VERTEX SHADER REQUIREMENTS
	Using a directional light requires calculating the normals relative to rotation and scale
	to pass to the fragment shader:

		vNormal = mat3(uNormalMatrix) * aNormal;

	FRAGMENT SHADER REQUIREMENTS
	Normals must be normalized:

		vec3 normal = normalize(vNormal);

	The dot product of the directional light vector and the normals will determine the lighting:

		float light = dot(normal, uDirectionalLight);

	Light is computed by multiplying the existing fragment color by the light value:

		gl_FragColor.rgb += gl_FragColor.rgb * ((light + 1.0) * 0.5);

	*/
	setDirection(x, y, z) {
		this.direction = Vector.normalize([x, y, z])
	}

	/* 
	VERTEX SHADER REQUIREMENTS
	Using a point light requires calculating the surface position as follows:

		vec3 surfacePosition = (uLocalMatrix * aPosition).xyz;

	Then one must calculate the normals relative to rotation and scale to pass to the fragment shader:

		vNormal = mat3(uNormalMatrix) * aNormal;

	Lastly, vectors representing the surface position to the light position and the surface position
	to the camera position should be passed to the fragment shader:

		vSurfaceToLight = uPointLight - surfacePosition;
		vSurfaceToCamera = uCameraPosition - surfacePosition;

	FRAGMENT SHADER REQUIREMENTS
	Normals, surface to light, and surface to camera vectors must be normalized:

		vec3 normal = normalize(vNormal);
		vec3 surfaceToLight = normalize(vSurfaceToLight);
		vec3 surfaceToCamera = normalize(vSurfaceToCamera);

	The half vector must be computed in order to get specular lighting:

		vec3 halfVector = normalize(vSurfaceToLight + vSurfaceToCamera);

	The dot product of the surface to light vector and the normals will determine the lighting:

		float light = dot(normal, surfaceToLight);

	The specular highlight requires the dot product of the normals and half vector raised to some power
	if the light value is greater than zero:

		float specular = 0.0;
		if (light > 0.0) {
			specular = pow(dot(normal, halfVector), 16.0);
		}

	Light is computed by multiplying the existing fragment color by the light value, while the specular
	is added to the final color value:

		gl_FragColor.rgb += gl_FragColor.rgb * ((light + 1.0) * 0.5);
		gl_FragColor.rgb += specular;

	*/
	setPosition(x, y, z) {
		this.position = [x, y, z]
	}
}