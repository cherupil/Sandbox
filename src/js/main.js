import sphereShaderVertex from '../shaders/sphere/vertex.glsl'
import sphereShaderFragment from '../shaders/sphere/fragment.glsl'
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
camera.position.z = 5
renderer.resize()

const plane = new Sandbox.Plane(2, 2, 1, 1)
const planeShader = new Sandbox.Program(renderer.gl, planeShaderVertex, planeShaderFragment)

for (let i = -1; i < 2; i++) {
	const greyValue = (i + 2) * 0.2
	const planeMesh = new Sandbox.Mesh(plane, planeShader)
	planeMesh.setUniform('uPlaneColor', [greyValue, greyValue, greyValue], '3f')
	planeMesh.setPosition(i * 3, 0, 0)
	volume.add(planeMesh)
}

let time = 0
let then = 0

const draw = (now) => {
	renderer.gl.clearColor(0, 0, 0, 1)
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
	}
})
window.requestAnimationFrame(draw)