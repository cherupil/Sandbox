import Geometry from './Geometry'

export default class Tetra extends Geometry {
	constructor(size) {
		const positions = []

		const height = (Math.sqrt(3) / 2) * size

		positions.push(
			-size/2, -(size * Math.sqrt(3)) / 6, (size * Math.sqrt(3)) / 6,
			size/2, -(size * Math.sqrt(3)) / 6, (size * Math.sqrt(3)) / 6,
			0, (size * Math.sqrt(3)) / 3, 0,

			size/2, -(size * Math.sqrt(3)) / 6, (size * Math.sqrt(3)) / 6,
			0, -(size * Math.sqrt(3)) / 6, -(size * Math.sqrt(3)) / 3,
			0, (size * Math.sqrt(3)) / 3, 0,

			0, -(size * Math.sqrt(3)) / 6, -(size * Math.sqrt(3)) / 3,
			-size/2, -(size * Math.sqrt(3)) / 6, (size * Math.sqrt(3)) / 6,
			0, (size * Math.sqrt(3)) / 3, 0,

			-size/2, -(size * Math.sqrt(3)) / 6, (size * Math.sqrt(3)) / 6,
			0, -(size * Math.sqrt(3)) / 6, -(size * Math.sqrt(3)) / 3,
			size/2, -(size * Math.sqrt(3)) / 6, (size * Math.sqrt(3)) / 6
		)

		super(positions)

		const uvs = []

		for (let i = 0; i < positions.length; i+=9) {
			if (i === 27) {
				uvs.push(1, (1 - Math.sqrt(0.75)) / 2, 0.5, ((1 - Math.sqrt(0.75)) / 2) + Math.sqrt(0.75), 0, (1 - Math.sqrt(0.75)) / 2)
			} else {
				uvs.push(0, (1 - Math.sqrt(0.75)) / 2, 1, (1 - Math.sqrt(0.75)) / 2, 0.5, ((1 - Math.sqrt(0.75)) / 2) + Math.sqrt(0.75))
			}
		}

		this.setAttribute('aUV', new Float32Array(uvs), 2)
	}
}