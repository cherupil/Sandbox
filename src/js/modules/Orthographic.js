import Matrix from './Matrix.js'

export default class Orthographic {
	constructor(left, right, bottom, top, near, far) {
		this.left = left
		this.right = right
		this.bottom = bottom
		this.top = top
		this.near = near
		this.far = far
		this.type = 'orthographic'
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
		this.createMatrix()
	}

	createMatrix() {
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
		if (this.lookAtEnabled) {
			matrix = Matrix.lookAt(
				[matrix[12], matrix[13], matrix[14]],
				[this.lookAtTarget.localMatrix[12], this.lookAtTarget.localMatrix[13], this.lookAtTarget.localMatrix[14]]
			)
		}
		this.viewMatrix = Matrix.inverse(matrix)
	}

	setViewProjectionMatrix() {
		this._recalculateViewMatrix()
		this.viewProjectionMatrix = Matrix.multiply(this.matrix, this.viewMatrix)
	}

	setLeft(left) {
		this.left = left
		this.createMatrix()
	}

	setRight(right) {
		this.right = right
		this.createMatrix()
	}

	setBottom(bottom) {
		this.bottom = bottom
		this.createMatrix()
	}

	setTop(top) {
		this.top = top
		this.createMatrix()
	}

	setNear(near) {
		this.near = near
		this.createMatrix()
	}

	setFar(far) {
		this.far = far
		this.createMatrix()
	}

	setPosition(x, y, z) {
		this.position = { x, y, z }
	}

	setRotationX(angle) {
		this.rotation.x = angle
	}

	setRotationY(angle) {
		this.rotation.y = angle
	}

	setRotationZ(angle) {
		this.rotation.z = angle
	}

	lookAt(target) {
		this.lookAtEnabled = true
		this.lookAtTarget = target
	}
}