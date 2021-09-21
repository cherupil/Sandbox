export default class Vector {
	static cross(a, b) {
		return [
			a[1] * b[2] - a[2] * b[1],
			a[2] * b[0] - a[0] * b[2],
			a[0] * b[1] - a[1] * b[0]
		]
	}

	static subtract(a, b) {
		return [
			a[0] - b[0],
			a[1] - b[1],
			a[2] - b[2]
		]
	}

	static normalize(v) {
		const magnitude = Math.sqrt((v[0]**2) + (v[1]**2) + (v[2]**2))

		if (magnitude > 0.00001) {
			return [
				v[0] / magnitude,
				v[1] / magnitude,
				v[2] / magnitude
			]
		} else {
			return [
				0,
				0,
				0
			]
		}
	}
}