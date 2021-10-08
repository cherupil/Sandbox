export default class FrameBuffer {
	constructor(gl, target) {
		this.gl = gl
		this.target = target

		this.buffer = this.gl.createFramebuffer()
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.buffer)

		this.depthBuffer = this.gl.createRenderbuffer()
		this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer)
		this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, this.target.width, this.target.height)

		this.attachTexture(this.target)
		this.attachRenderBuffer()
	}

	resize(width, height) {
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.target.texture)
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.target.format, width, height, 0, this.target.format, this.gl.UNSIGNED_BYTE,
              null)
		this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer)
		this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, width, height)
	}

	attachTexture(target) {
		this.target = target
		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.target.texture, 0)
	}

	attachRenderBuffer() {
		this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.depthBuffer)
	}
}