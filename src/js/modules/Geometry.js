let geometryId = 0

export default class Geometry {
	constructor(positions) {
        this.id = geometryId++
        this.attributes = {}
        this.setAttribute('aPosition', new Float32Array(positions), 3)
        this._generateNormals(positions)
    }

    setAttribute(name, data, size) {
        this.attributes[name] = {
            name,
            data,
            size,
            count: data.length / size
        }
    }

    _generateNormals(positions) {
        const normals = []
        for (var i = 0; i < positions.length; i+=3) {
            const x = positions[i]
            const y = positions[i + 1]
            const z = positions[i + 2]
            const magnitude = Math.sqrt((x**2) + (y**2) + (z**2))
            normals.push((x/magnitude), (y/magnitude), (z/magnitude))
        }
        this.setAttribute('aNormal', new Float32Array(normals), 3)
    }
}