// an attribute will receive data from a buffer
attribute vec4 aPosition;
attribute vec3 aColor;

varying vec3 vColor;

// all shaders have a main function
void main() {

	// gl_Position is a special variable a vertex shader
	// is responsible for setting
	gl_Position = aPosition;

	vColor = aColor;
}