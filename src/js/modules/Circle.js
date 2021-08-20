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
		this.type = 'TRIANGLE_FAN'
	}
}