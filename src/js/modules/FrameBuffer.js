export default class FrameBuffer {
	constructor(gl, target) {
		this.gl = gl
		this.target = target
		this.buffer = this.gl.createFramebuffer()
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.buffer)

		this.attach(this.target)
	}

	attach(target) {
		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, target.texture, 0)
	}
}