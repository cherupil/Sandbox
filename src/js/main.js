import sphereShaderVertex from '../shaders/sphere/vertex.glsl'
import sphereShaderFragment from '../shaders/sphere/fragment.glsl'
import planeShaderVertex from '../shaders/plane/vertex.glsl'
import planeShaderFragment from '../shaders/plane/fragment.glsl'

import Sandbox from './modules/Sandbox.js'

let aspectRatio = window.innerWidth / window.innerHeight
const canvas = document.getElementById('webgl')
const renderer = new Sandbox.Renderer(canvas)
//renderer.setPixelRatio(1)

const jellyfish = new Sandbox.Texture(renderer.gl, './img/jellyfish.jpg')

const volume = new Sandbox.Volume()

//Plane
const plane = new Sandbox.Plane(2, 2, 1, 1)
const planeShader = new Sandbox.Program(renderer.gl, planeShaderVertex, planeShaderFragment)
planeShader.setUniform('uTexture', jellyfish.texture, 'tex')
const planeMesh = new Sandbox.Mesh(plane, planeShader)
volume.add(planeMesh)

planeMesh.setPosition(-3, 1.5, 0)

//Circle
const circle = new Sandbox.Circle(1, 64)
const circleMesh = new Sandbox.Mesh(circle, planeShader)
volume.add(circleMesh)

circleMesh.setPosition(0, 1.5, 0)

//Triangle
const triangleSize = 2.25
const triangleHeight = (Math.sqrt(3) / 2) * triangleSize
const trianglePositions = []
trianglePositions.push(
	-triangleSize/2, -(triangleSize * Math.sqrt(3)) / 6, 0,
	triangleSize/2, -(triangleSize * Math.sqrt(3)) / 6, 0,
	0, (triangleSize * Math.sqrt(3)) / 3, 0
)
const triangle = new Sandbox.Geometry(trianglePositions)
const triangleUVs = []
triangleUVs.push(
	0, (1 - Math.sqrt(0.75)) / 2,
	1, (1 - Math.sqrt(0.75)) / 2,
	0.5, ((1 - Math.sqrt(0.75)) / 2) + Math.sqrt(0.75)
)
triangle.setAttribute('aUV', new Float32Array(triangleUVs), 2)
const triangleMesh = new Sandbox.Mesh(triangle, planeShader)
volume.add(triangleMesh)

triangleMesh.setPosition(3, 1.125, 0)

//Cube
const cube = new Sandbox.Cube(2, 2, 2, 8, 8, 8)
const cubeMesh = new Sandbox.Mesh(cube, planeShader)
volume.add(cubeMesh)

cubeMesh.setPosition(-3, -1.5, -1)

//Sphere
const sphere = new Sandbox.Sphere(1, 64)
const sphereMesh = new Sandbox.Mesh(sphere, planeShader)
volume.add(sphereMesh)

sphereMesh.setPosition(0, -1.5, -1)

//Sphere
const tetra = new Sandbox.Tetrahedron(2.25)
const tetraMesh = new Sandbox.Mesh(tetra, planeShader)
volume.add(tetraMesh)

tetraMesh.setPosition(3, -1.875, -1)

//Set Viewport
const camera = new Sandbox.Perspective(70, aspectRatio, 0.1, 100)
//const camera = new Sandbox.Orthographic(-6 * aspectRatio, 6 * aspectRatio, -6, 6, -30, 30)
camera.position.z = 5
renderer.resize()

//Clear canvas
renderer.gl.clearColor(0, 0, 0, 0)

let time = 0

const translateX = document.getElementById('translateX')
const translateY = document.getElementById('translateY')

translateX.addEventListener('input', event => {
	camera.position.x = event.target.value
})

translateY.addEventListener('input', event => {
	camera.position.y = event.target.value
})

const buttons = document.querySelectorAll('button')

buttons.forEach(button => {
	button.addEventListener('click', event => {
		buttons.forEach(item => item.classList.remove('active'))
		button.classList.add('active')
		switch (button.id) {
			case 'plane':
				camera.lookAt(planeMesh)
				break
			case 'circle':
				camera.lookAt(circleMesh)
				break
			case 'triangle':
				camera.lookAt(triangleMesh)
				break
			case 'cube':
				camera.lookAt(cubeMesh)
				break
			case 'sphere':
				camera.lookAt(sphereMesh)
				break
			case 'tetra':
				camera.lookAt(tetraMesh)
				break
			default:
				break
		}
	})
})
let then = 0
const draw = (now) => {
	renderer.render(volume, camera)
	now *= 0.001
	time += now - then
	/*translateX.value = Math.cos(time) * 5
 	camera.position.x = Math.cos(time) * 5
 	translateY.value = Math.sin(time) * 5
 	camera.position.y = Math.sin(time) * 5*/
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
	translateX.classList.add('active')
 	translateY.classList.add('active')
}, 500)
