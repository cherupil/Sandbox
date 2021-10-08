import pickingShaderVertex from '../shaders/picking/vertex.glsl'
import pickingShaderFragment from '../shaders/picking/fragment.glsl'
import planeShaderVertex from '../shaders/plane/vertex.glsl'
import planeShaderFragment from '../shaders/plane/fragment.glsl'

import Sandbox from './modules/Sandbox.js'

/*const SPECTOR = require('spectorjs')
const spector = new SPECTOR.Spector()
spector.displayUI()*/

const canvas = document.getElementById('webgl')
const renderer = new Sandbox.Renderer(canvas)
const volume = new Sandbox.Volume()

let aspectRatio = window.innerWidth / window.innerHeight
const camera = new Sandbox.Perspective(70, aspectRatio, 0.1, 100)
//const camera = new Sandbox.Orthographic(-3 * aspectRatio, 3 * aspectRatio, -3, 3, -7, 7)
camera.position.z = 5
renderer.resize()

const pickingShader = new Sandbox.Program(renderer.gl, pickingShaderVertex, pickingShaderFragment)

const cube = new Sandbox.Cube(2, 2, 2, 1, 1, 1)
const planeShader = new Sandbox.Program(renderer.gl, planeShaderVertex, planeShaderFragment)

for (let i = 0; i < 3; i++) {
	const planeMesh = new Sandbox.Mesh(cube, planeShader)
	planeMesh.setUniform('uPlaneColor', [0.0, 0.0, 1.0], '3f')
	planeMesh.setUniform('uPickingColor', ((i+1)/3), '1f')
	planeMesh.setPosition((i-1) * 3, 0, 0)
	volume.add(planeMesh)
}

const pickingTexture = new Sandbox.DataTexture(renderer.gl, 'rgba', renderer.gl.canvas.width, renderer.gl.canvas.height, null, 'linear')
const pickingBuffer = new Sandbox.FrameBuffer(renderer.gl, pickingTexture)

let mouse = {
	x: -1,
	y: -1
}

const colorPicker = new Sandbox.ColorPicker(renderer.gl, mouse, camera)

canvas.addEventListener('mousemove', (event) => {
	const bounds = canvas.getBoundingClientRect()
	mouse.x = event.clientX - bounds.left
	mouse.y = event.clientY - bounds.top
})

let previousObjectIndex = -1

let time = 0
let then = 0

const draw = (now) => {
	//Picking Buffer
	for (let i = 0; i < volume.objects.length; i++) {
		volume.objects[i].setRotationX(time * 10)
		volume.objects[i].setRotationY(time * 10)
		volume.objects[i].setShader(pickingShader)
	}
	renderer.setFrameBuffer(pickingBuffer)
	renderer.gl.clearColor(0, 0, 0, 0)
	camera.matrix = colorPicker.getMatrix()
	renderer.render(volume, camera)

	//Picking Logic
	const objectIndex = colorPicker.getObjectIndex()

	if (previousObjectIndex > -1) {
		volume.objects[previousObjectIndex].uniforms.uPlaneColor.value = [0.0, 0.0, 1.0]
	}

	if (objectIndex > -1) {
		volume.objects[objectIndex].uniforms.uPlaneColor.value = [1.0, 0.0, 0.0]
		previousObjectIndex = objectIndex
	}

	//Canvas
	for (let i = 0; i < volume.objects.length; i++) {
		volume.objects[i].setShader(planeShader)
	}
	renderer.setFrameBuffer(null)
	renderer.gl.clearColor(1, 1, 1, 1)
	camera.createMatrix()
	renderer.render(volume, camera)
	now *= 0.001
	time += now - then
 	then = now
	window.requestAnimationFrame(draw)
}

window.addEventListener('resize', () => {
	if (renderer.resize()) {
		aspectRatio = renderer.gl.canvas.width / renderer.gl.canvas.height
		camera.setAspectRatio(aspectRatio)
		pickingBuffer.resize(renderer.gl.canvas.width, renderer.gl.canvas.height)
	}
})
window.requestAnimationFrame(draw)