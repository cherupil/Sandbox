import triangleShaderVertex from '../shaders/triangle/vertex.glsl'
import triangleShaderFragment from '../shaders/triangle/fragment.glsl'

import planeShaderVertex from '../shaders/plane/vertex.glsl'
import planeShaderFragment from '../shaders/plane/fragment.glsl'

import Sandbox from './modules/Sandbox.js'
import Matrix from './modules/Matrix.js'

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
geometry.setAttribute('aColor', new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0]), 3)
const triangleShader = new Sandbox.Program(renderer.gl, triangleShaderVertex, triangleShaderFragment)
const triangleMesh = new Sandbox.Mesh(geometry, triangleShader)
const volume = new Sandbox.Volume()
volume.add(triangleMesh)

//Plane
const plane = new Sandbox.Plane(0.625, 0.625, 1, 1)
const planeShader = new Sandbox.Program(renderer.gl, planeShaderVertex, planeShaderFragment)
planeShader.setUniform('uResolution', [canvas.clientWidth, canvas.clientHeight], '2f')
const planeMesh = new Sandbox.Mesh(plane, planeShader)
planeMesh.setPosition2D(-0.5, 0.5)
volume.add(planeMesh)

//Circle
const circle = new Sandbox.Circle(0.375, 64)
const circleMesh = new Sandbox.Mesh(circle, planeShader)
circleMesh.setPosition2D(0.5, 0)
volume.add(circleMesh)

//Set Viewport
renderer.resize()

//Clear canvas
renderer.gl.clearColor(0, 0, 0, 0)
renderer.gl.clear(renderer.gl.COLOR_BUFFER_BIT)

let time = 0

const draw = () => {
	renderer.render(volume)
	time += 0.01
	triangleMesh.setScale2D((Math.sin(time) + 1) / 2, (Math.sin(time) + 1) / 2)
	planeMesh.setRotation2D(time * 100)
	circleMesh.setPosition2D(0.5, Math.cos(time) * 0.5)
	//planeMesh.shader.uniforms.uScale.value = [time, time]
	//planeMesh.shader.uniforms.uTranslation.value[0] = Math.cos(time)
	//planeMesh.shader.uniforms.uTranslation.value[1] = Math.sin(time)
	window.requestAnimationFrame(draw)
}

window.addEventListener('resize', renderer.resize)
window.requestAnimationFrame(draw)
