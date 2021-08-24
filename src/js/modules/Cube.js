import Geometry from './Geometry'

export default class Cube extends Geometry {
	constructor(width, height, depth, widthSegments, heightSegments, depthSegments) {
		const positions = []

		const segmentWidth = width / widthSegments
		const segmentHeight = height / heightSegments
		const segmentDepth = depth / depthSegments

		//Front and Back
		for (let i = 0; i < 2; i++) {
			for (let j = 0; j < heightSegments; j++) {
				for (let k = 0; k < widthSegments; k++) {
					const x1 = (k * segmentWidth) - (width / 2)
					const y1 = (j * segmentHeight) - (height / 2)
					const z = (i * depth) - (depth / 2)

					const x2 = ((k + 1) * segmentWidth) - (width / 2)
					const y2 = y1

					const x3 = x1
					const y3 = ((j + 1) * segmentHeight) - (height / 2)

					const x4 = x1
					const y4 = y3

					const x5 = x2
					const y5 = y2

					const x6 = x2
					const y6 = y3

					if (i === 0) {
						positions.push(x1, y1, z, x2, y2, z, x3, y3, z, x4, y4, z, x5, y5, z, x6, y6, z)
					} else {
						positions.push(x1, y1, z, x3, y3, z, x2, y2, z, x4, y4, z, x6, y6, z, x5, y5, z)
					}
				}
			}
		}

		//Top and Bottom
		for (let i = 0; i < 2; i++) {
			for (let j = 0; j < depthSegments; j++) {
				for (let k = 0; k < widthSegments; k++) {
					const x1 = (k * segmentWidth) - (width / 2)
					const y = (i * height) - (height / 2)
					const z1 = (j * segmentDepth) - (depth / 2)

					const x2 = ((k + 1) * segmentWidth) - (width / 2)
					const z2 = z1

					const x3 = x1
					const z3 = ((j + 1) * segmentDepth) - (depth / 2)

					const x4 = x1
					const z4 = z3

					const x5 = x2
					const z5 = z2

					const x6 = x2
					const z6 = z3

					if (i === 0) {
						positions.push(x1, y, z1, x3, y, z3, x2, y, z2, x4, y, z4, x6, y, z6, x5, y, z5)
					} else {
						positions.push(x1, y, z1, x2, y, z2, x3, y, z3, x4, y, z4, x5, y, z5, x6, y, z6)
					}
				}
			}
		}

		//Left and Right
		for (let i = 0; i < 2; i++) {
			for (let j = 0; j < depthSegments; j++) {
				for (let k = 0; k < widthSegments; k++) {
					const x = (i * width) - (width / 2)
					const y1 = (j * segmentHeight) - (height / 2)
					const z1 = (k * segmentDepth) - (depth / 2)

					const y2 = ((j + 1) * segmentHeight) - (height / 2)
					const z2 = z1

					const y3 = y1
					const z3 = ((k + 1) * segmentDepth) - (depth / 2)

					const y4 = y1
					const z4 = z3

					const y5 = y2
					const z5 = z2

					const y6 = y2
					const z6 = z3

					if (i === 0) {
						positions.push(x, y1, z1, x, y2, z2, x, y3, z3, x, y4, z4, x, y5, z5, x, y6, z6)
					} else {
						positions.push(x, y1, z1, x, y3, z3, x, y2, z2, x, y4, z4, x, y6, z6, x, y5, z5)
					}
				}
			}
		}
		super(positions)
	}
}