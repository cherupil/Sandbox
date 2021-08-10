export default class Mesh {
	constructor(gl, geometry, shader) {
		this.gl = gl
		this.geometry = geometry
		this.shader = shader
		this._setAttributeData()
	}

	_setAttributeData() {
		for (const attribute in this.geometry.attributes) {
			this.geometry.attributes[attribute].location = this.gl.getAttribLocation(this.shader, this.geometry.attributes[attribute].name)
			this.geometry.attributes[attribute].buffer = this.gl.createBuffer()
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.geometry.attributes[attribute].buffer)
			this.gl.bufferData(this.gl.ARRAY_BUFFER, this.geometry.attributes[attribute].data, this.gl.STATIC_DRAW)
		}
	}
}