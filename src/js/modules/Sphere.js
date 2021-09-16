import Geometry from './Geometry'

export default class Sphere extends Geometry {
	constructor(radius, segments) {
		const positions = []
		const uvs = []

		const segmentSize = (Math.PI * 2) / segments

		for (let i = 0; i < segments; i++) {
			for (let j = 0; j < segments; j++) {
				const x1 = radius * Math.cos(j * segmentSize) * Math.sin(i * segmentSize)
				const y1 = radius * Math.cos(i * segmentSize)
				const z1 = radius * Math.sin(j * segmentSize) * Math.sin(i * segmentSize)
				
				const x2 = radius * Math.cos(j * segmentSize) * Math.sin((i + 1) * segmentSize)
				const y2 = radius * Math.cos((i + 1) * segmentSize)
				const z2 = radius * Math.sin(j * segmentSize) * Math.sin((i + 1) * segmentSize)

				const x3 = radius * Math.cos((j + 1) * segmentSize) * Math.sin((i + 1) * segmentSize)
				const y3 = radius * Math.cos((i + 1) * segmentSize)
				const z3 = radius * Math.sin((j + 1) * segmentSize) * Math.sin((i + 1) * segmentSize)

				const x4 = x1
				const y4 = y1
				const z4 = z1

				const x5 = x3
				const y5 = y3
				const z5 = z3

				const x6 = radius * Math.cos((j + 1) * segmentSize) * Math.sin(i * segmentSize)
				const y6 = radius * Math.cos(i * segmentSize)
				const z6 = radius * Math.sin((j + 1) * segmentSize) * Math.sin(i * segmentSize)

				positions.push(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4, x5, y5, z5, x6, y6, z6)
			}
		}

		super(positions)

		for (let i = 0; i < this.attributes.aNormal.data.length; i+=3) {
			let offset = 0
			if (
				(this.attributes.aNormal.data[i+1] == -1) &&
				(this.attributes.aNormal.data[i] >= 0)
			) {
				offset = -0.5
			} else if (
				(this.attributes.aNormal.data[i+1] == -1) &&
				(this.attributes.aNormal.data[i] < 0)
			) {
				offset = 0.5
			}
			const u = 0.5 + (Math.atan2(this.attributes.aNormal.data[i], this.attributes.aNormal.data[i+2]) / (Math.PI * 2))
			const v = 0.5 - (Math.asin(this.attributes.aNormal.data[i+1]) / Math.PI)
			uvs.push(u + offset, 1 - v)
		}

		const pointsPerRow = 6 * 2 * segments

		const quarterCircle = 3 * (pointsPerRow / 4)

		for (let i = 0; i < uvs.length; i+=pointsPerRow) {
			if (i !== 0) {
				uvs[i-(quarterCircle)] = 1
				uvs[i-(quarterCircle-2)] = 1
				uvs[i-(quarterCircle-6)] = 1
			}
		}

		uvs[uvs.length - (quarterCircle)] = 1
		uvs[uvs.length - (quarterCircle - 2)] = 1
		uvs[uvs.length - (quarterCircle - 6)] = 1

		this.setAttribute('aUV', new Float32Array(uvs), 2)
	}
}