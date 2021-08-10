export default class Renderer {
	constructor(element) {
		this.gl = element.getContext('webgl', {
			powerPreference: 'high-performance'
		})
	}

	resize() {
        const displayWidth = this.gl.canvas.clientWidth
        const displayHeight = this.gl.canvas.clientHeight

        const needsResize = this.gl.canvas.width !== displayWidth || this.gl.canvas.height !== displayHeight

        if (needsResize) {
            this.gl.canvas.width = displayWidth
            this.gl.canvas.height = displayHeight
        }
    }

    render(volume) {
    	for (const object of volume.objects) {
			this.gl.useProgram(object.shader)

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

			const primitiveType = this.gl.TRIANGLES
			const vertexOffset = 0
			const count = object.geometry.attributes.aPosition.count
			this.gl.drawArrays(primitiveType, vertexOffset, count)
    	}
    }
}