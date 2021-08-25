import Matrix from './Matrix.js'

export default class Mesh {
	constructor(geometry, shader) {
		this.geometry = geometry
		this.shader = shader
		this.position = {
			x: 0,
			y: 0,
			z: 0
		}
		this.rotation = {
			x: 0,
			y: 0,
			z: 0
		}
		this.scale = {
			x: 1,
			y: 1,
			z: 1
		}
		this.localMatrix = Matrix.identity()
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
		const identity = Matrix.identity()
		const translation = Matrix.translate(this.position.x, this.position.y, this.position.z)
		const rotationX = Matrix.rotateX(this.rotation.x)
		const rotationY = Matrix.rotateY(this.rotation.y)
		const rotationZ = Matrix.rotateZ(this.rotation.z)
		const scale = Matrix.scale(this.scale.x, this.scale.y, this.scale.z)
		let matrix = Matrix.multiply(identity, translation)
		matrix = Matrix.multiply(matrix, rotationX)
		matrix = Matrix.multiply(matrix, rotationY)
		matrix = Matrix.multiply(matrix, rotationZ)
		matrix = Matrix.multiply(matrix, scale)
		this.localMatrix = matrix
	}

	setProjectionMatrix(matrix) {
		this.projectionMatrix = Matrix.multiply(matrix, this.localMatrix)
	}

	setPosition(x, y, z) {
		this.position = { x, y, z }
		this._recalculateModelMatrix()
	}

	setRotationX(angle) {
		this.rotation.x = angle
		this._recalculateModelMatrix()
	}

	setRotationY(angle) {
		this.rotation.y = angle
		this._recalculateModelMatrix()
	}

	setRotationZ(angle) {
		this.rotation.z = angle
		this._recalculateModelMatrix()
	}

	setScale(x, y, z) {
		this.scale = { x, y, z }
		this._recalculateModelMatrix()
	}
}