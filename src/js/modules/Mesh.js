import Matrix from './Matrix.js'

export default class Mesh {
	constructor(geometry, shader) {
		this.geometry = geometry
		this.shader = shader
		this.position = {
			x: 0,
			y: 0
		}
		this.rotation = 0
		this.scale = {
			x: 1,
			y: 1
		}
		this.matrix = Matrix.identity2D()
		this._setAttributeData()
		this._setUniformData()
		this._setDrawMode()
	}

	_setAttributeData() {
		for (const attribute in this.geometry.attributes) {
			this.geometry.attributes[attribute].location = this.shader.gl.getAttribLocation(this.shader.program, this.geometry.attributes[attribute].name)
			this.geometry.attributes[attribute].buffer = this.shader.gl.createBuffer()
			this.shader.gl.bindBuffer(this.shader.gl.ARRAY_BUFFER, this.geometry.attributes[attribute].buffer)
			this.shader.gl.bufferData(this.shader.gl.ARRAY_BUFFER, this.geometry.attributes[attribute].data, this.shader.gl.STATIC_DRAW)
		}
	}

	_setUniformData() {
		if (this.shader.uniforms) {
			for (const uniform in this.shader.uniforms) {
				this.shader.uniforms[uniform].location = this.shader.gl.getUniformLocation(this.shader.program, this.shader.uniforms[uniform].name)
			}
		}
	}

	_setDrawMode() {
		this.drawMode = this.geometry.type ?? 'TRIANGLES'
    }

	_recalculateModelMatrix() {
		const identity = Matrix.identity2D()
		const translation = Matrix.translate2D(this.position.x, this.position.y)
		const rotation = Matrix.rotate2D(this.rotation)
		const scale = Matrix.scale2D(this.scale.x, this.scale.y)
		let matrix = Matrix.multiply3x3(identity, translation)
		matrix = Matrix.multiply3x3(matrix, rotation)
		matrix = Matrix.multiply3x3(matrix, scale)
		this.matrix = matrix
	}

	setPosition2D(x, y) {
		this.position = { x, y }
		this._recalculateModelMatrix()
	}

	setRotation2D(angle) {
		this.rotation = angle
		this._recalculateModelMatrix()
	}

	setScale2D(x, y) {
		this.scale = { x, y }
		this._recalculateModelMatrix()
	}
}