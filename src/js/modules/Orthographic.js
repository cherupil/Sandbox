import Matrix from './Matrix.js'

export default class Orthographic {
	constructor(left, right, bottom, top, near, far) {
		this.left = left
		this.right = right
		this.bottom = bottom
		this.top = top
		this.near = near
		this.far = far
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
		this.viewMatrix = Matrix.identity()
		this._createMatrix()
	}

	_createMatrix() {
		this.matrix = [
			2 / (this.right - this.left), 0, 0, 0,
			0, 2 / (this.top - this.bottom), 0, 0,
			0, 0, -2 / (this.far - this.near), 0,
			-(this.right + this.left) / (this.right - this.left), -(this.top + this.bottom) / (this.top - this.bottom), -(this.far + this.near) / (this.far - this.near), 1
		]
	}

	_recalculateViewMatrix() {
		const identity = Matrix.identity()
		const translation = Matrix.translate(this.position.x, this.position.y, this.position.z)
		const rotationX = Matrix.rotateX(this.rotation.x)
		const rotationY = Matrix.rotateY(this.rotation.y)
		const rotationZ = Matrix.rotateZ(this.rotation.z)
		let matrix = Matrix.multiply(identity, translation)
		matrix = Matrix.multiply(matrix, rotationX)
		matrix = Matrix.multiply(matrix, rotationY)
		matrix = Matrix.multiply(matrix, rotationZ)
		this.viewMatrix = Matrix.inverse(matrix)
	}

	setViewProjectionMatrix() {
		this._recalculateViewMatrix()
		this.viewProjectionMatrix = Matrix.multiply(this.matrix, this.viewMatrix)
	}

	setLeft(left) {
		this.left = left
		this._createMatrix()
	}

	setRight(right) {
		this.right = right
		this._createMatrix()
	}

	setBottom(bottom) {
		this.bottom = bottom
		this._createMatrix()
	}

	setTop(top) {
		this.top = top
		this._createMatrix()
	}

	setNear(near) {
		this.near = near
		this._createMatrix()
	}

	setFar(far) {
		this.far = far
		this._createMatrix()
	}

	setPosition(x, y, z) {
		this.position = { x, y, z }
		this.setViewProjectionMatrix()
	}

	setRotationX(angle) {
		this.rotation.x = angle
		this.setViewProjectionMatrix()
	}

	setRotationY(angle) {
		this.rotation.y = angle
		this.setViewProjectionMatrix()
	}

	setRotationZ(angle) {
		this.rotation.z = angle
		this.setViewProjectionMatrix()
	}
}