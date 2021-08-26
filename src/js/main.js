import planeShaderVertex from '../shaders/plane/vertex.glsl'
import planeShaderFragment from '../shaders/plane/fragment.glsl'

import cubeShaderVertex from '../shaders/cube/vertex.glsl'
import cubeShaderFragment from '../shaders/cube/fragment.glsl'

import Sandbox from './modules/Sandbox.js'

let aspectRatio = window.innerWidth / window.innerHeight
const canvas = document.getElementById('webgl')
const renderer = new Sandbox.Renderer(canvas)

//Plane
const circle = new Sandbox.Circle(0.25, 64)
const planeShader = new Sandbox.Program(renderer.gl, planeShaderVertex, planeShaderFragment)
const planeMesh = new Sandbox.Mesh(circle, planeShader)
planeMesh.setPosition(0, 0, 0.30)

//Cube
const cube = new Sandbox.Cube(0.5, 0.5, 0.5, 64, 64, 64)
const cubeShader = new Sandbox.Program(renderer.gl, cubeShaderVertex, cubeShaderFragment)
cubeShader.setUniform('uTime', 0, '1f')
const cubeMesh = new Sandbox.Mesh(cube, cubeShader)
cubeMesh.setRotationX(37.5)
cubeMesh.setRotationY(45)

const volume = new Sandbox.Volume()
volume.add(cubeMesh)
volume.add(planeMesh)

//Set Viewport
const camera = new Sandbox.Orthographic(-1 * aspectRatio, 1 * aspectRatio, -1, 1, -1, 1)
renderer.resize()

//Clear canvas
renderer.gl.clearColor(0, 0, 0, 0)

let time = 0

const draw = () => {
	renderer.render(volume, camera)
	time += 0.1
	cubeMesh.shader.uniforms.uTime.value = time
	//cubeMesh.setRotationX(3 * time)
	//cubeMesh.setRotationY(4.5 * time)
	window.requestAnimationFrame(draw)
}

window.addEventListener('resize', () => {
	if (renderer.resize()) {
		aspectRatio = renderer.gl.canvas.width / renderer.gl.canvas.height
		camera.setLeft(-1 * aspectRatio)
		camera.setRight(1 * aspectRatio)
	}
})
window.requestAnimationFrame(draw)
