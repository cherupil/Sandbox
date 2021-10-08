export default class ColorPicker {
	constructor(gl, mouse) {
		this.gl = gl
		this.mouse = mouse
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

	getObjectIndex() {
		this._getPixel()
		this._getColor()
		this.selectedIndex = ((this.color[3] / 255) * 3) - 1
		return this.selectedIndex
	}
}