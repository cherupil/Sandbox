import Geometry from './Geometry'

export default class Cube extends Geometry {
	constructor(width, height, depth, widthSegments, heightSegments, depthSegments) {
		const positions = []

		//Front
		createSide('x', 'y', 'z', width, height, depth, widthSegments, heightSegments, 'front')

		//Back
		createSide('x', 'y', 'z', width, height, -depth, widthSegments, heightSegments, 'back')

		//Top
		createSide('x', 'z', 'y', width, depth, height, widthSegments, depthSegments, 'back')

		//Bottom
		createSide('x', 'z', 'y', width, depth, -height, widthSegments, depthSegments, 'front')

		//Right
		createSide('z', 'y', 'x', depth, height, width, depthSegments, heightSegments, 'back')

		//Left
		createSide('z', 'y', 'x', depth, height, -width, depthSegments, heightSegments, 'front')

		function createSide(x, y, z, xLength, yLength, depth, xSegments, ySegments, direction) {
			const segmentX = xLength / xSegments
			const segmentY = yLength / ySegments

			const z1 = depth / 2

			for (let i = 0; i < ySegments; i++) {
				for (let j = 0; j < xSegments; j++) {
					const point = {}
					point[x] = []
					point[y] = []
					point[z] = []
					
					const x1 = (j * segmentX) - xLength / 2
					const y1 = (i * segmentY) - yLength / 2
					const x2 = ((j + 1) * segmentX) - xLength / 2
					const y2 = ((i + 1) * segmentY) - yLength / 2
					point[x].push(x1)
					point[y].push(y1)
					point[z].push(z1)

					point[x].push(x2)
					point[y].push(y1)
					point[z].push(z1)

					point[x].push(x1)
					point[y].push(y2)
					point[z].push(z1)

					point[x].push(x1)
					point[y].push(y2)
					point[z].push(z1)

					point[x].push(x2)
					point[y].push(y1)
					point[z].push(z1)

					point[x].push(x2)
					point[y].push(y2)
					point[z].push(z1)

					if (direction === 'front') {
						positions.push(
							point.x[0], point.y[0], point.z[0], 
							point.x[1], point.y[1], point.z[1],
							point.x[2], point.y[2], point.z[2],
							point.x[3], point.y[3], point.z[3],
							point.x[4], point.y[4], point.z[4],
							point.x[5], point.y[5], point.z[5]
						)
					} else if (direction === 'back') {
						positions.push(
							point.x[0], point.y[0], point.z[0], 
							point.x[2], point.y[2], point.z[2],
							point.x[1], point.y[1], point.z[1],
							point.x[3], point.y[3], point.z[3],
							point.x[5], point.y[5], point.z[5],
							point.x[4], point.y[4], point.z[4]
						)
					}
				}
			}
		}

		super(positions)
	}
}