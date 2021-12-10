import Renderer from './Renderer.js'
import Orthographic from './Orthographic.js'
import Perspective from './Perspective.js'
import Volume from './Volume.js'
import Collection from './Collection.js'
import Mesh from './Mesh.js'
import Geometry from './Geometry.js'
import Plane from './Plane.js'
import Circle from './Circle.js'
import Tetrahedron from './Tetrahedron.js'
import Cube from './Cube.js'
import Sphere from './Sphere.js'
import Program from './Program.js'
import { ImageTexture, DataTexture } from './Texture.js'
import Light from './Light.js'
import FrameBuffer from './FrameBuffer.js'
import ColorPicker from './ColorPicker.js'

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
Sandbox.Orthographic = Orthographic
Sandbox.Perspective = Perspective
Sandbox.Volume = Volume
Sandbox.Collection = Collection
Sandbox.Mesh = Mesh
Sandbox.Geometry = Geometry
Sandbox.Plane = Plane
Sandbox.Circle = Circle
Sandbox.Tetrahedron = Tetrahedron
Sandbox.Cube = Cube
Sandbox.Sphere = Sphere
Sandbox.Program = Program
Sandbox.ImageTexture = ImageTexture
Sandbox.DataTexture = DataTexture
Sandbox.Light = Light
Sandbox.FrameBuffer = FrameBuffer
Sandbox.ColorPicker = ColorPicker
