export default class Orthographic {
	constructor(left, right, bottom, top, near, far) {
		this.left = left
		this.right = right
		this.bottom = bottom
		this.top = top
		this.near = near
		this.far = far
		this._createMatrix()
	}

	_createMatrix() {
		this.matrix = [
			2 / (this.right - this.left), 0, 0, 0,
			0, 2 / (this.top - this.bottom), 0, 0,
			0, 0, 2 / (this.far - this.near), 0,
			-(this.right + this.left) / (this.right - this.left), -(this.top + this.bottom) / (this.top - this.bottom), (this.far + this.near) / (this.far - this.near), 1
		]
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
}