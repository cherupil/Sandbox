import triangleShaderVertex from '../shaders/triangle/vertex.glsl'
import triangleShaderFragment from '../shaders/triangle/fragment.glsl'

import planeShaderVertex from '../shaders/plane/vertex.glsl'
import planeShaderFragment from '../shaders/plane/fragment.glsl'

import Sandbox from './modules/Sandbox.js'
import Matrix from './modules/Matrix.js'

let aspectRatio = window.innerWidth / window.innerHeight
const canvas = document.getElementById('webgl')
const renderer = new Sandbox.Renderer(canvas)

//Triangle
let length = 1
const height = length * Math.sqrt(3) / 2
const geometry = new Sandbox.Geometry([
	-(length / 2), - height / 2, 0,
	(length / 2), - height / 2, 0,
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
planeMesh.setPosition(-1, 0.5, 0)
volume.add(planeMesh)

//Circle
const circle = new Sandbox.Circle(0.375, 64)
const circleMesh = new Sandbox.Mesh(circle, planeShader)
circleMesh.setPosition(1, 0, 0)
volume.add(circleMesh)

//Cube
const cube = new Sandbox.Cube(1, 1, 1, 1, 1, 1)
const cubeColors = []
cubeColors.push(1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0)
cubeColors.push(1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0)
cubeColors.push(1.0, 0.0, 0.5, 1.0, 0.0, 0.5, 1.0, 0.0, 0.5)
cubeColors.push(1.0, 0.0, 0.5, 1.0, 0.0, 0.5, 1.0, 0.0, 0.5)
cubeColors.push(0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0)
cubeColors.push(0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0)
cubeColors.push(0.5, 0.5, 0.0, 0.5, 0.5, 0.0, 0.5, 0.5, 0.0)
cubeColors.push(0.5, 0.5, 0.0, 0.5, 0.5, 0.0, 0.5, 0.5, 0.0)
cubeColors.push(0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0)
cubeColors.push(0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0)
cubeColors.push(0.0, 0.5, 1.0, 0.0, 0.5, 1.0, 0.0, 0.5, 1.0)
cubeColors.push(0.0, 0.5, 1.0, 0.0, 0.5, 1.0, 0.0, 0.5, 1.0)
cube.setAttribute('aColor', new Float32Array(cubeColors), 3)
const cubeMesh = new Sandbox.Mesh(cube, triangleShader)
volume.add(cubeMesh)

//Set Viewport
const camera = new Sandbox.Orthographic(-1 * aspectRatio, 1 * aspectRatio, -1, 1, -1, 1)
renderer.resize()

//Clear canvas
renderer.gl.clearColor(0, 0, 0, 0)

let time = 0

const draw = () => {
	renderer.render(volume, camera)
	time += 0.01
	triangleMesh.setScale((Math.sin(time) + 1) / 2, (Math.sin(time) + 1) / 2, 1)
	planeMesh.setRotationZ(time * 100)
	circleMesh.setPosition(1, 0.5, 0)
	//cubeMesh.setRotationX(30 * time)
	//cubeMesh.setRotationY(45 * time)
	//planeMesh.shader.uniforms.uScale.value = [time, time]
	//planeMesh.shader.uniforms.uTranslation.value[0] = Math.cos(time)
	//planeMesh.shader.uniforms.uTranslation.value[1] = Math.sin(time)
	window.requestAnimationFrame(draw)
}

window.addEventListener('resize', () => {
	if (renderer.resize()) {
		aspectRatio = renderer.gl.canvas.width / renderer.gl.canvas.height
		camera.setLeft(-1 * aspectRatio)
		camera.setRight(1 * aspectRatio)
		planeShader.uniforms.uResolution.value = [canvas.clientWidth, canvas.clientHeight]
	}
})
window.requestAnimationFrame(draw)

const rotateXInput = document.getElementById('rotateX')
const rotateYInput = document.getElementById('rotateY')
const rotateZInput = document.getElementById('rotateZ')

rotateXInput.addEventListener('input', event => {
	console.log('cube Z: ', event.target.value)
	cubeMesh.setPosition(0, 0, event.target.value)
})

rotateYInput.addEventListener('input', event => {
	console.log('rotate Y: ', event.target.value)
	cubeMesh.setRotationY(event.target.value)
})

rotateZInput.addEventListener('input', event => {
	console.log('triangle Z: ', event.target.value)
	triangleMesh.setPosition(0, 0, event.target.value)
})
