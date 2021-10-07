export default class Volume {
	constructor() {
		this.objects = []
	}

	add(object) {
		this.objects.push(object)
		this.objects.sort((a, b) => {
			const bufferDiff = a.geometryID - b.geometryID
			if (bufferDiff) {
				return bufferDiff
			}
			return a.shader.id - b.shader.id
		})
	}
}