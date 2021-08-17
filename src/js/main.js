import triangleShaderVertex from '../shaders/triangle/vertex.glsl'
import triangleShaderFragment from '../shaders/triangle/fragment.glsl'

import planeShaderVertex from '../shaders/plane/vertex.glsl'
import planeShaderFragment from '../shaders/plane/fragment.glsl'

import Sandbox from './modules/Sandbox.js'

const aspectRatio = window.innerWidth / window.innerHeight
const canvas = document.getElementById('webgl')
const renderer = new Sandbox.Renderer(canvas)

//Triangle
let length = 1
const height = length * Math.sqrt(3) / 2
const geometry = new Sandbox.Geometry([
	-(length / 2) / aspectRatio, - height / 2, 0,
	(length / 2) / aspectRatio, - height / 2, 0,
	0, height / 2, 0
])
geometry.setAttribute('aColor', new Float32Array([1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]), 3)
const triangleShader = new Sandbox.Program(renderer.gl, triangleShaderVertex, triangleShaderFragment)
const triangleMesh = new Sandbox.Mesh(renderer.gl, geometry, triangleShader)
const volume = new Sandbox.Volume()
volume.add(triangleMesh)

length = 0.5
const geometry2 = new Sandbox.Geometry([
	-(length / 2) / aspectRatio, - height / 2, 0,
	(length / 2) / aspectRatio, - height / 2, 0,
	0, height / 2, 0
])
geometry2.setAttribute('aColor', new Float32Array([1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]), 3)
const triangleMesh2 = new Sandbox.Mesh(renderer.gl, geometry2, triangleShader)

//Plane
const plane = new Sandbox.Plane(0.5, 0.5, 1, 1)
const planeShader = new Sandbox.Program(renderer.gl, planeShaderVertex, planeShaderFragment)
const planeMesh = new Sandbox.Mesh(renderer.gl, plane, planeShader)
volume.add(planeMesh)

volume.add(triangleMesh)

volume.add(planeMesh)

volume.add(triangleMesh)

volume.add(triangleMesh2)

volume.add(planeMesh)

volume.add(triangleMesh)

volume.add(triangleMesh2)

//Set Viewport
renderer.resize()

//Clear canvas
renderer.gl.clearColor(0, 0, 0, 0)
renderer.gl.clear(renderer.gl.COLOR_BUFFER_BIT)

const draw = () => {
	renderer.render(volume)
	window.requestAnimationFrame(draw)
}

window.addEventListener('resize', renderer.resize)
window.requestAnimationFrame(draw)
