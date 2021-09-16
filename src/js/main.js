import sphereShaderVertex from '../shaders/sphere/vertex.glsl'
import sphereShaderFragment from '../shaders/sphere/fragment.glsl'
import planeShaderVertex from '../shaders/plane/vertex.glsl'
import planeShaderFragment from '../shaders/plane/fragment.glsl'

import Sandbox from './modules/Sandbox.js'

let aspectRatio = window.innerWidth / window.innerHeight
const canvas = document.getElementById('webgl')
const renderer = new Sandbox.Renderer(canvas)
renderer.setPixelRatio(1)

const volume = new Sandbox.Volume()

//Circle
const circle = new Sandbox.Circle(1, 64)
const circleShader = new Sandbox.Program(renderer.gl, planeShaderVertex, planeShaderFragment)
const circleMesh = new Sandbox.Mesh(circle, circleShader)
volume.add(circleMesh)

console.log(circleMesh)

//Plane
const plane = new Sandbox.Plane(2, 2, 8, 8)
const planeMesh = new Sandbox.Mesh(plane, circleShader)
volume.add(planeMesh)

planeMesh.setPosition(-3, 0, 0)

console.log(planeMesh)

//Cube
const cube = new Sandbox.Cube(1, 1, 1, 8, 8, 8)
const cubeMesh = new Sandbox.Mesh(cube, circleShader)
volume.add(cubeMesh)

cubeMesh.setPosition(3, 0, 0)

console.log(cubeMesh)

//Set Viewport
const camera = new Sandbox.Perspective(70, aspectRatio, 0.1, 100)
camera.position.z = 3
renderer.resize()

//Clear canvas
renderer.gl.clearColor(0, 0, 0, 0)

let time = 0

const rotateY = document.getElementById('rotateY')
const rotateX = document.getElementById('rotateX')

rotateY.addEventListener('input', event => {
	circleMesh.setRotationY(event.target.value)
	planeMesh.setRotationY(event.target.value)
	cubeMesh.setRotationY(event.target.value)
})

rotateX.addEventListener('input', event => {
	circleMesh.setRotationX(event.target.value)
	planeMesh.setRotationX(event.target.value)
	cubeMesh.setRotationX(event.target.value)
})

const draw = () => {
	renderer.render(volume, camera)
	time += 0.1
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

const mouse = {
	x1: 0,
	y1: 0,
	x2: 0,
	y2: 0
}

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
