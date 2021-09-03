import Matrix from './Matrix.js'

export default class Perspective {
	constructor(fieldOfView, aspectRatio, near, far) {
		this.fieldOfView = fieldOfView * Math.PI / 180
		this.aspectRatio = aspectRatio
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
		this._setViewProjectionMatrix()
	}

	_createMatrix() {
		this.top = this.near * Math.tan(this.fieldOfView / 2)
		this.bottom = -this.top
		this.right = this.top * this.aspectRatio
		this.left = -this.right

		this.matrix = [
			2 * this.near / (this.right - this.left), 0, 0, 0,
			0, 2 * this.near / (this.top - this.bottom), 0, 0,
			0, 0, -(this.far + this.near) / (this.far - this.near), -1,
			-this.near * (this.right + this.left) / (this.right - this.left), -this.near * (this.top + this.bottom) / (this.top - this.bottom), (2 * this.far * this.near) / (this.near - this.far), 0
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

	_setViewProjectionMatrix() {
		this.viewProjectionMatrix = Matrix.multiply(this.matrix, this.viewMatrix)
	}

	setFieldOfView(fieldOfView) {
		this.fieldOfView = fieldOfView * Math.PI / 180
		this._createMatrix()
		this._setViewProjectionMatrix()
	}

	setAspectRatio(aspectRatio) {
		this.aspectRatio = aspectRatio
		this._createMatrix()
		this._setViewProjectionMatrix()
	}

	setNear(near) {
		this.near = near
		this._createMatrix()
		this._setViewProjectionMatrix()
	}

	setFar(far) {
		this.far = far
		this._createMatrix()
		this._setViewProjectionMatrix()
	}

	setPosition(x, y, z) {
		this.position = { x, y, z }
		this._recalculateViewMatrix()
		this._setViewProjectionMatrix()
	}

	setRotationX(angle) {
		this.rotation.x = angle
		this._recalculateViewMatrix()
		this._setViewProjectionMatrix()
	}

	setRotationY(angle) {
		this.rotation.y = angle
		this._recalculateViewMatrix()
		this._setViewProjectionMatrix()
	}

	setRotationZ(angle) {
		this.rotation.z = angle
		this._recalculateViewMatrix()
		this._setViewProjectionMatrix()
	}
}