
let programId = 0

export default class Program {
	constructor(gl, vertex, fragment) {
		const vertexShader = this._createShader(gl, gl.VERTEX_SHADER, vertex)
		const fragmentShader = this._createShader(gl, gl.FRAGMENT_SHADER, fragment)
		this.gl = gl
		this.id = programId++
		this.program = this._createProgram(gl, vertexShader, fragmentShader)
		this.uniforms = {
			uMatrix: {
				name: 'uMatrix',
				value: null,
				type: 'mat3'
			}
		}
	}

	_createShader(gl, type, source) {
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

	_createProgram(gl, vertexShader, fragmentShader) {
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

	setUniform(name, value, type) {
        this.uniforms[name] = {
            name,
            value,
            type
        }
    }
}