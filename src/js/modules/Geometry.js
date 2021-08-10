export default class Geometry {
	constructor(positions) {
        this.attributes = {}
        this.setAttribute('aPosition', new Float32Array(positions), 3)
    }

    setAttribute(name, data, size) {
        this.attributes[name] = {
            name,
            data,
            size,
            count: data.length / size
        }
    }
}