export default class Renderer {
	constructor(element) {
		this.gl = element.getContext('webgl', {
			powerPreference: 'high-performance'
		})

		this.resize = this.resize.bind(this)
		this.render = this.render.bind(this)
		this.pixelRatio = 2.0
		this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true)
		this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 1)
		this.framebuffer = null
	}

	setPixelRatio(ratio) {
		this.pixelRatio = ratio
	}

	setFrameBuffer(framebuffer) {
		if (framebuffer !== null) {
			this.framebuffer = framebuffer.buffer
		} else {
			this.framebuffer = null
		}
	}

	resize() {
        const displayWidth = this.gl.canvas.clientWidth * this.pixelRatio
        const displayHeight = this.gl.canvas.clientHeight * this.pixelRatio

        const needsResize = this.gl.canvas.width * this.pixel !== displayWidth || this.gl.canvas.height * this.pixelRatio !== displayHeight

        if (needsResize) {
            this.gl.canvas.width = displayWidth
            this.gl.canvas.height = displayHeight

            this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height)

            return true
        }

        return false
    }

    render(volume, camera) {
    	this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer)
    	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)

    	this.gl.enable(this.gl.CULL_FACE)
    	this.gl.enable(this.gl.DEPTH_TEST)

    	let lastShader = null
    	let lastBuffer = null

    	camera.setViewProjectionMatrix()

    	for (const object of volume.objects) {    
    		object.setProjectionMatrix(camera.viewProjectionMatrix)
    		let bindBuffers = false

    		if (object.shader.program !== lastShader) {
    			this.gl.useProgram(object.shader.program)
    			lastShader = object.shader.program
    			bindBuffers = true
    		}

    		if (bindBuffers || object.geometry.attributes != lastBuffer) {
				for (const attribute in object.geometry.attributes) {
					this.gl.enableVertexAttribArray(object.geometry.attributes[attribute].location)
					this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.geometry.attributes[attribute].buffer)
					const size = object.geometry.attributes[attribute].size
					const type = this.gl.FLOAT
					const normalize = false
					const stride = 0
					const offset = 0
					this.gl.vertexAttribPointer(object.geometry.attributes[attribute].location, size, type, normalize, stride, offset)
				}
				lastBuffer = object.geometry.attributes
			}

			for (const uniform in object.shader.uniforms) {
				if (uniform === 'uViewProjectionMatrix') {
					this.gl.uniformMatrix4fv(object.shader.uniforms[uniform].location, false, object.projectionMatrix)
				} else if (uniform === 'uNormalMatrix') {
					this.gl.uniformMatrix4fv(object.shader.uniforms[uniform].location, false, object.normalMatrix)
				} else if (uniform === 'uLocalMatrix') {
					this.gl.uniformMatrix4fv(object.shader.uniforms[uniform].location, false, object.localMatrix)
				} else {
					switch (object.shader.uniforms[uniform].type) {
						case '1f':
							this.gl.uniform1f(object.shader.uniforms[uniform].location, object.shader.uniforms[uniform].value)
							break
						case '2f':
							this.gl.uniform2f(object.shader.uniforms[uniform].location, object.shader.uniforms[uniform].value[0], object.shader.uniforms[uniform].value[1])
							break
						case '3f':
							this.gl.uniform3f(object.shader.uniforms[uniform].location, object.shader.uniforms[uniform].value[0], object.shader.uniforms[uniform].value[1], object.shader.uniforms[uniform].value[2])
							break
						case 'mat3':
							this.gl.uniformMatrix3fv(object.shader.uniforms[uniform].location, false, object.shader.uniforms[uniform].value)
							break
						case 'mat4':
							this.gl.uniformMatrix4fv(object.shader.uniforms[uniform].location, false, object.shader.uniforms[uniform].value)
							break
						case 'tex':
							this.gl.uniform1i(object.shader.uniforms[uniform].location, object.shader.uniforms[uniform].value.id)
							this.gl.activeTexture(this.gl.TEXTURE0 + object.shader.uniforms[uniform].value.id)
							this.gl.bindTexture(this.gl.TEXTURE_2D, object.shader.uniforms[uniform].value.texture)
						default:
							break
					}
				}
			}

			const primitiveType = this.gl[object.drawMode]
			const vertexOffset = 0
			const count = object.geometry.attributes.aPosition.count
			this.gl.drawArrays(primitiveType, vertexOffset, count)
    	}
    }
}