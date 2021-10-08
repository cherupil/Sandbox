export default class ColorPicker {
	constructor(gl, mouse, camera) {
		this.gl = gl
		this.mouse = mouse
		this.camera = camera
		this.color = new Uint8Array(4)
		this.selectedIndex = -1
	}

	_getPixel() {
		this.pixel = {
			x: this.mouse.x * this.gl.canvas.width / this.gl.canvas.clientWidth,
			y: this.gl.canvas.height - this.mouse.y * this.gl.canvas.height / this.gl.canvas.clientHeight - 1
		}
	}

	_getColor() {
		this.gl.readPixels(this.pixel.x, this.pixel.y, 1, 1, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.color)
	}

	getMatrix() {
		this._getPixel()
		if (this.camera.type === 'perspective') {
			this.top = this.camera.near * Math.tan(this.camera.fieldOfView / 2)
			this.bottom = -this.top
			this.right = this.top * this.camera.aspectRatio
			this.left = -this.right
		} else if (this.camera.type === 'orthographic') {
			this.top = this.camera.top
			this.bottom = this.camera.bottom
			this.right = this.camera.right
			this.left = this.camera.left
		}
		this.width = Math.abs(this.right - this.left)
		this.height = Math.abs(this.top - this.bottom)

		this.pixelLeft = this.left + this.pixel.x * this.width / this.gl.canvas.width
		this.pixelRight = this.pixelLeft + (1 / this.gl.canvas.width)
		this.pixelTop = this.bottom  + this.pixel.y * this.height / this.gl.canvas.height
		this.pixelBottom = this.pixelTop + (1 / this.gl.canvas.height)
		this.near = this.camera.near
		this.far = this.camera.far

		if (this.camera.type === 'perspective') {
			this.matrix = [
				2 * this.near / (this.pixelRight - this.pixelLeft), 0, 0, 0,
				0, 2 * this.near / (this.pixelTop - this.pixelBottom), 0, 0,
				(this.pixelRight + this.pixelLeft) / (this.pixelRight - this.pixelLeft), (this.pixelTop + this.pixelBottom) / (this.pixelTop - this.pixelBottom), -(this.far + this.near) / (this.far - this.near), -1,
				0, 0, (2 * this.far * this.near) / (this.near - this.far), 0
			]
		} else if (this.camera.type === 'orthographic') {
			this.matrix = [
				2 / (this.pixelRight - this.pixelLeft), 0, 0, 0,
				0, 2 / (this.pixelTop - this.pixelBottom), 0, 0,
				0, 0, -2 / (this.far - this.near), 0,
				-((this.pixelRight + this.pixelLeft) / (this.pixelRight - this.pixelLeft)), -((this.pixelTop + this.pixelBottom) / (this.pixelTop - this.pixelBottom)), -((this.far + this.near) / (this.far - this.near)), 1
			]
		}

		return this.matrix
	}

	getObjectIndex() {
		this._getColor()
		this.selectedIndex = ((this.color[3] / 255) * 3) - 1
		return this.selectedIndex
	}
}