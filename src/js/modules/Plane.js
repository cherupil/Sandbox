import Geometry from './Geometry'

export default class Plane extends Geometry {
	constructor(width, height, widthSegments, heightSegments) {
		const positions = []

		const segmentWidth = width / widthSegments
		const segmentHeight = height / heightSegments

		for (let i = 0; i < heightSegments; i++) {
			for (let j = 0; j < widthSegments; j++) {
				const x1 = (j * segmentWidth) - width / 2
				const y1 = (i * segmentHeight) - height / 2
				const z = 0

				const x2 = ((j + 1) * segmentWidth) - width / 2
				const y2 = y1

				const x3 = x1
				const y3 = ((i + 1) * segmentHeight) - height / 2

				const x4 = x1
				const y4 = y3

				const x5 = x2
				const y5 = y2

				const x6 = x2
				const y6 = y3

				positions.push(x1, y1, z, x2, y2, z, x3, y3, z, x4, y4, z, x5, y5, z, x6, y6, z)
			}
		}
		super(positions)

		const normals = []
        for (var i = 0; i < positions.length; i+=3) {
            const x = positions[i]
            const y = positions[i + 1]
            const z = 1
            const magnitude = Math.sqrt((x**2) + (y**2) + (z**2))
            normals.push((x/magnitude), (y/magnitude), 1)
        }
        this.attributes.aNormal.data = new Float32Array(normals)
        this.attributes.aNormal.count = normals.length / 3

		const uvs = []
		for (let i = 0; i < positions.length; i+=3) {
			const x = (positions[i] + width/2) / width
			const y = (positions[i+1] + height/2) / height
			uvs.push(x, y)
		}
		this.setAttribute('aUV', new Float32Array(uvs), 2)
	}
}