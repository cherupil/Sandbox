import Matrix from './Matrix.js'

export default class Collection {
	constructor() {
		this.items = []
		this.position = {
			x: 0,
			y: 0,
			z: 0
		}
		this.rotation = {
			x: 0,
			y: 0,
			z: 0
		}
		this.scale = {
			x: 1,
			y: 1,
			z: 1
		}
		this.localMatrix = Matrix.identity()
	}

	_recalculateModelMatrix() {
		const identity = Matrix.identity()
		const translation = Matrix.translate(this.position.x, this.position.y, this.position.z)
		const rotationX = Matrix.rotateX(this.rotation.x)
		const rotationY = Matrix.rotateY(this.rotation.y)
		const rotationZ = Matrix.rotateZ(this.rotation.z)
		const scale = Matrix.scale(this.scale.x, this.scale.y, this.scale.z)
		let matrix = Matrix.multiply(identity, translation)
		matrix = Matrix.multiply(matrix, rotationX)
		matrix = Matrix.multiply(matrix, rotationY)
		matrix = Matrix.multiply(matrix, rotationZ)
		matrix = Matrix.multiply(matrix, scale)
		this.localMatrix = matrix
	}

	setProjectionMatrix(matrix) {
		this._recalculateModelMatrix()
		this.projectionMatrix = matrix
	}

	setPosition(x, y, z) {
		this.position = { x, y, z }
		this._recalculateModelMatrix()
	}

	setRotationX(angle) {
		this.rotation.x = angle
		this._recalculateModelMatrix()
	}

	setRotationY(angle) {
		this.rotation.y = angle
		this._recalculateModelMatrix()
	}

	setRotationZ(angle) {
		this.rotation.z = angle
		this._recalculateModelMatrix()
	}

	setScale(x, y, z) {
		this.scale = { x, y, z }
		this._recalculateModelMatrix()
	}
}