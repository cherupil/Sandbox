export default class Orthographic {
	constructor(left, right, bottom, top, near, far) {
		this.left = left
		this.right = right
		this.bottom = bottom
		this.top = top
		this.near = near
		this.far = far
		this.createMatrix()
	}

	createMatrix() {
		this.matrix = [
			2 / (this.right - this.left), 0, 0, 0,
			0, 2 / (this.top - this.bottom), 0, 0,
			0, 0, 2 / (this.near - this.far), 0,
			(this.left + this.right) / (this.left - this.right), (this.bottom + this.top) / (this.bottom - this.top), (this.near + this.far) / (this.near - this.far), 1
		]
	}
}