import sphereShaderVertex from '../shaders/sphere/vertex.glsl'
import sphereShaderFragment from '../shaders/sphere/fragment.glsl'

import Sandbox from './modules/Sandbox.js'

let aspectRatio = window.innerWidth / window.innerHeight
const canvas = document.getElementById('webgl')
const renderer = new Sandbox.Renderer(canvas)
renderer.setPixelRatio(1)

const volume = new Sandbox.Volume()

//Cube
const sphere = new Sandbox.Sphere(1, 64)
sphere.type = 'LINE_LOOP'
const sphereShader = new Sandbox.Program(renderer.gl, sphereShaderVertex, sphereShaderFragment)
sphereShader.setUniform('uTime', 0, '1f')
const sphereMesh = new Sandbox.Mesh(sphere, sphereShader)
volume.add(sphereMesh)

//Set Viewport
const camera = new Sandbox.Perspective(70, aspectRatio, 0.1, 100)
camera.position.z = 3
renderer.resize()

//Clear canvas
renderer.gl.clearColor(0, 0, 0, 0)

let time = 0

const draw = () => {
	renderer.render(volume, camera)
	time += 0.1
	sphereMesh.setRotationY(time * 10)
	sphereMesh.shader.uniforms.uTime.value = time
	window.requestAnimationFrame(draw)
}

window.addEventListener('resize', () => {
	if (renderer.resize()) {
		aspectRatio = renderer.gl.canvas.width / renderer.gl.canvas.height
		camera.setAspectRatio(aspectRatio)
	}
})
window.requestAnimationFrame(draw)

const controls = document.querySelector('.controls')
const cameraX = document.getElementById('cameraX')
const cameraY = document.getElementById('cameraY')

const mouse = {
	x1: 0,
	y1: 0,
	x2: 0,
	y2: 0
}

cameraX.addEventListener('input', event => {
	camera.position.x = event.target.value
})

cameraY.addEventListener('input', event => {
	camera.position.y = event.target.value
})

controls.addEventListener('mousedown', event => {
	if (event.target.classList.contains('controls')) {
		event.preventDefault()
		mouse.x1 = event.clientX
		mouse.y1 = event.clientY
		document.onmouseup = removeDrag
		document.onmousemove = dragControls
	}
})

const dragControls = (event) => {
	event.preventDefault()
	mouse.x2 = mouse.x1 - event.clientX
	mouse.y2 = mouse.y1 - event.clientY
	mouse.x1 = event.clientX
	mouse.y1 = event.clientY

	controls.style.top = `${controls.offsetTop - mouse.y2}px`
	controls.style.bottom = `auto`
	controls.style.left = `${controls.offsetLeft - mouse.x2}px`
}

const removeDrag = () => {
	document.onmouseup = null
	document.onmousemove = null
}

window.setTimeout(() => {
	controls.classList.add('active')
}, 500)
