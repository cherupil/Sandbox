import testShaderVertex from '../shaders/test/vertex.glsl'
import testShaderFragment from '../shaders/test/fragment.glsl'

import Sandbox from './modules/Sandbox.js'

const aspectRatio = window.innerWidth / window.innerHeight

const canvas = document.getElementById('webgl')
const renderer = new Sandbox.Renderer(canvas)
const length = 1
const height = length * Math.sqrt(3) / 2
const geometry = new Sandbox.Geometry([
	-(length / 2) / aspectRatio, - height / 2, 0,
	(length / 2) / aspectRatio, - height / 2, 0,
	0, height / 2, 0
])
geometry.setAttribute('aColor', new Float32Array([1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]), 3)
const shader = Sandbox.Shader.create(renderer.gl, testShaderVertex, testShaderFragment)
const mesh = new Sandbox.Mesh(renderer.gl, geometry, shader)
const volume = new Sandbox.Volume()
volume.add(mesh)

//Set Viewport
renderer.resize()
renderer.gl.viewport(0, 0, renderer.gl.canvas.width, renderer.gl.canvas.height)

//Clear canvas
renderer.gl.clearColor(0, 0, 0, 0)
renderer.gl.clear(renderer.gl.COLOR_BUFFER_BIT)

renderer.render(volume)
