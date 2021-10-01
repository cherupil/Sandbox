let textureId = 0

export class ImageTexture {
	constructor(gl, path) {
		this.gl = gl
		this.texture = this.gl.createTexture()
		this.id = textureId++

		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture)
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 0, 255]))

		this.image = new Image()
		this.image.addEventListener('load', this.attachImage.bind(this))
		this.image.src = path
	}

	attachImage() {
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture)
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.image)
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE)
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE)
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR)
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR)
	}
}

export class DataTexture {
	constructor(gl, format, width, height, data) {
		this.gl = gl
		this.texture = this.gl.createTexture()
		this.id = textureId++
		this.width = width
		this.height = height

		switch (format) {
			case 'rgba':
				this.format = this.gl.RGBA
				break
			case 'rgb':
				this.format = this.gl.RGB
				break
			case 'luminance_alpha':
				this.format = this.gl.LUMINANCE_ALPHA
				break
			case 'luminance':
				this.format = this.gl.LUMINANCE
				break
		}

		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture)
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.format, width, height, 0, this.format, this.gl.UNSIGNED_BYTE,
              new Uint8Array(data))

		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE)
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE)
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST)
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST)
	}
}