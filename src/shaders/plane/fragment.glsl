// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default
precision mediump float;

void main() {
	// gl_FragColor is a special variable a fragment shader
	// is responsible for setting
	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // return reddish-purple
}