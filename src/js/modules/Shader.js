export default class Shader {
	static create(gl, vertex, fragment) {
		const vertexShader = this._createShader(gl, gl.VERTEX_SHADER, vertex)
		const fragmentShader = this._createShader(gl, gl.FRAGMENT_SHADER, fragment)
		return this._createProgram(gl, vertexShader, fragmentShader)
	}

	static _createShader(gl, type, source) {
		const shader = gl.createShader(type)
		gl.shaderSource(shader, source)
		gl.compileShader(shader)
		const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
		if (success) {
			return shader
		}

		console.log(gl.getShaderInfoLog(shader))
		gl.deleteShader(shader)
	}

	static _createProgram(gl, vertexShader, fragmentShader) {
		const program = gl.createProgram()
		gl.attachShader(program, vertexShader)
		gl.attachShader(program, fragmentShader)
		gl.linkProgram(program)
		const success = gl.getProgramParameter(program, gl.LINK_STATUS)
		if (success) {
			return program
		}

		console.log(gl.getProgramInfoLog(program))
		gl.deleteProgram(program)
	}
}