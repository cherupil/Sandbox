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
	}
}