import Renderer from './Renderer.js'
import Volume from './Volume.js'
import Mesh from './Mesh.js'
import Geometry from './Geometry.js'
import Plane from './Plane.js'
import Circle from './Circle.js'
import Program from './Program.js'

export default class Sandbox {
	static createColor(r, g, b) {
		return {
			r: (r / 255),
			g: (g / 255),
			b: (b / 255)
		}
	}
}

Sandbox.Renderer = Renderer
Sandbox.Volume = Volume
Sandbox.Mesh = Mesh
Sandbox.Geometry = Geometry
Sandbox.Plane = Plane
Sandbox.Circle = Circle
Sandbox.Program = Program

