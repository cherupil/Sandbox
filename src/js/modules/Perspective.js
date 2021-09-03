export default class Perspective {
	constructor(fieldOfView, aspectRatio, near, far) {
		this.fieldOfView = fieldOfView * Math.PI / 180
		this.aspectRatio = aspectRatio
		this.near = near
		this.far = far
		this._createMatrix()
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

	setFieldOfView(fieldOfView) {
		this.fieldOfView = fieldOfView * Math.PI / 180
		this._createMatrix()
	}

	setAspectRatio(aspectRatio) {
		this.aspectRatio = aspectRatio
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
}