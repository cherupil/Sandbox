import Geometry from './Geometry'

export default class Cylinder extends Geometry {
	constructor(radius, height, segments) {
		const positions = []


		//Front
		for (let i = 0; i < segments; i++) {
			positions.push(0, 0, height / 2)

			const x1 = Math.cos(i * Math.PI / (segments / 2)) * radius
			const y1 = Math.sin(i * Math.PI / (segments / 2)) * radius
			const z1 = height / 2
			positions.push(x1, y1, z1)

			const x2 = Math.cos((i + 1) * Math.PI / (segments / 2)) * radius
			const y2 = Math.sin((i + 1) * Math.PI / (segments / 2)) * radius
			const z2 = height / 2
			positions.push(x2, y2, z2)
		}

		//Back
		for (let i = 0; i < segments; i++) {
			positions.push(0, 0, -height / 2)

			const x1 = Math.cos(i * Math.PI / (segments / 2)) * radius
			const y1 = Math.sin(i * Math.PI / (segments / 2)) * radius
			const z1 = -height / 2
			positions.push(x1, y1, z1)

			const x2 = Math.cos((i + 1) * Math.PI / (segments / 2)) * radius
			const y2 = Math.sin((i + 1) * Math.PI / (segments / 2)) * radius
			const z2 = -height / 2
			positions.push(x2, y2, z2)
		}

		//Sides
		for (let i = 0; i < segments; i++) {
			const x1 = Math.cos(i * Math.PI / (segments / 2)) * radius
			const y1 = Math.sin(i * Math.PI / (segments / 2)) * radius
			const z1 = height / 2
			positions.push(x1, y1, z1)

			const x2 = Math.cos((i + 1) * Math.PI / (segments / 2)) * radius
			const y2 = Math.sin((i + 1) * Math.PI / (segments / 2)) * radius
			positions.push(x2, y2, z1)

			const z2 = -height / 2
			positions.push(x1, y1, z2)

			positions.push(x2, y2, z2)
			positions.push(x1, y1, z2)
			positions.push(x2, y2, z1)
		}

		//positions.push(Math.cos(0) * radius, Math.sin(0) * radius, 0)

		super(positions)

		const normals = []
        for (var i = 0; i < positions.length; i+=3) {
            const x = positions[i]
            const y = positions[i + 1]
            const z = positions[i + 2] > 0 ? 1 : -1
            const magnitude = Math.sqrt((x**2) + (y**2) + (z**2))
            normals.push((x/magnitude), (y/magnitude), (z/magnitude))
        }
        this.attributes.aNormal.data = new Float32Array(normals)
        this.attributes.aNormal.count = normals.length / 3

		const uvs = []
		for (let i = 0; i < positions.length; i+=3) {
			const x = (positions[i] + radius) / (radius * 2)
			const y = (positions[i + 1] + radius) / (radius * 2)
			uvs.push(x, y)
		}
		this.setAttribute('aUV', new Float32Array(uvs), 2)

		//this.type = 'TRIANGLE_FAN'
	}
}