export default class Renderer {
	constructor(element) {
		this.gl = element.getContext('webgl', {
			powerPreference: 'high-performance'
		})

		this.resize = this.resize.bind(this)
		this.render = this.render.bind(this)
		this.depthTest = true
		this.faceCulling = true
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

        const needsResize = this.gl.canvas.width * this.pixelRatio !== displayWidth || this.gl.canvas.height * this.pixelRatio !== displayHeight

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

    	if (this.faceCulling) {
    		this.gl.enable(this.gl.CULL_FACE)
    	}
    	if (this.depthTest) {
    		this.gl.enable(this.gl.DEPTH_TEST)
    	}
    	this.gl.enable(this.gl.BLEND)
    	this.gl.blendEquation( this.gl.FUNC_ADD )
		this.gl.blendFunc( this.gl.ONE_MINUS_CONSTANT_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA )

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

    		if (bindBuffers || object.attributes != lastBuffer) {
				for (const attribute in object.attributes) {
					this.gl.enableVertexAttribArray(object.attributes[attribute].location)
					this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.attributes[attribute].buffer)
					const size = object.attributes[attribute].size
					const type = this.gl.FLOAT
					const normalize = false
					const stride = 0
					const offset = 0
					this.gl.vertexAttribPointer(object.attributes[attribute].location, size, type, normalize, stride, offset)
				}
				lastBuffer = object.attributes
			}

			for (const uniform in object.uniforms) {
				if (uniform === 'uViewProjectionMatrix') {
					this.gl.uniformMatrix4fv(object.uniforms[uniform].location, false, object.projectionMatrix)
				} else if (uniform === 'uNormalMatrix') {
					this.gl.uniformMatrix4fv(object.uniforms[uniform].location, false, object.normalMatrix)
				} else if (uniform === 'uLocalMatrix') {
					this.gl.uniformMatrix4fv(object.uniforms[uniform].location, false, object.localMatrix)
				} else {
					switch (object.uniforms[uniform].type) {
						case '1f':
							this.gl.uniform1f(object.uniforms[uniform].location, object.uniforms[uniform].value)
							break
						case '2f':
							this.gl.uniform2f(object.uniforms[uniform].location, object.uniforms[uniform].value[0], object.uniforms[uniform].value[1])
							break
						case '3f':
							this.gl.uniform3f(object.uniforms[uniform].location, object.uniforms[uniform].value[0], object.uniforms[uniform].value[1], object.uniforms[uniform].value[2])
							break
						case '4f':
							this.gl.uniform4f(object.uniforms[uniform].location, object.uniforms[uniform].value[0], object.uniforms[uniform].value[1], object.uniforms[uniform].value[2], object.uniforms[uniform].value[3])
							break
						case 'mat3':
							this.gl.uniformMatrix3fv(object.uniforms[uniform].location, false, object.uniforms[uniform].value)
							break
						case 'mat4':
							this.gl.uniformMatrix4fv(object.uniforms[uniform].location, false, object.uniforms[uniform].value)
							break
						case 'tex':
							this.gl.uniform1i(object.uniforms[uniform].location, object.uniforms[uniform].value.id)
							this.gl.activeTexture(this.gl.TEXTURE0 + object.uniforms[uniform].value.id)
							this.gl.bindTexture(this.gl.TEXTURE_2D, object.uniforms[uniform].value.texture)
						default:
							break
					}
				}
			}

			const primitiveType = this.gl[object.drawMode]
			const vertexOffset = 0
			const count = object.attributes.aPosition.count
			this.gl.drawArrays(primitiveType, vertexOffset, count)
    	}
    }
}