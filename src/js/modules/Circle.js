import Geometry from './Geometry'

export default class Circle extends Geometry {
	constructor(radius, segments) {
		const positions = []

		positions.push(0, 0, 0)

		for (let i = 0; i < segments; i++) {
			const x = Math.cos(i * Math.PI / (segments / 2)) * radius
			const y = Math.sin(i * Math.PI / (segments / 2)) * radius
			const z = 0
			positions.push(x, y, z)
		}

		positions.push(Math.cos(0) * radius, Math.sin(0) * radius, 0)

		super(positions)

		const normals = []
        for (var i = 0; i < positions.length; i+=3) {
            const x = positions[i]
            const y = positions[i + 1]
            const z = 1
            const magnitude = Math.sqrt((x**2) + (y**2) + (z**2))
            normals.push((x/magnitude), (y/magnitude), (z/magnitude))
        }
        this.setAttribute('aNormal', new Float32Array(normals), 3)

		const uvs = []

		for (let i = 0; i < positions.length; i+=3) {
			const x = (positions[i] + radius) / (radius * 2)
			const y = (positions[i+1] + radius) / (radius * 2)
			uvs.push(x, y)
		}

		this.setAttribute('aUV', new Float32Array(uvs), 2)

		this.type = 'TRIANGLE_FAN'
	}
}