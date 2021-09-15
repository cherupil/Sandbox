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

//Sphere
//const sphere = new Sandbox.Sphere(0.5, 64)
//sphere.type = 'LINE_LOOP'
const sphereShader = new Sandbox.Program(renderer.gl, sphereShaderVertex, sphereShaderFragment)
sphereShader.setUniform('uTime', 0, '1f')
//const sphereMesh = new Sandbox.Mesh(sphere, sphereShader)
//volume.add(sphereMesh)*/

//Cube
const cube = new Sandbox.Cube(1, 2, 3, 10, 12, 16)
//cube.type = 'LINE_LOOP'
const cubeMesh = new Sandbox.Mesh(cube, sphereShader)
cubeMesh.setScale(0.5, 0.5, 0.5)
//volume.add(cubeMesh)

//cubeMesh.position.x = -1.5

//Tetrahedron
const tetra = new Sandbox.Tetrahedron(1)
//tetra.type = 'LINE_LOOP'
const tetraMesh = new Sandbox.Mesh(tetra, sphereShader)
volume.add(tetraMesh)

//tetraMesh.position.x = 1.5

tetraMesh.position.y = -(Math.sqrt(3) / 2) / 6

//Plane
/*const plane = new Sandbox.Plane(5, 3, 8, 4)
const planeShader = new Sandbox.Program(renderer.gl, planeShaderVertex, planeShaderFragment)
const planeMesh = new Sandbox.Mesh(plane, planeShader)*/
//volume.add(planeMesh)

console.log(cubeMesh)

//Set Viewport
const camera = new Sandbox.Perspective(70, aspectRatio, 0.1, 100)
//const camera = new Sandbox.Orthographic(-1 * aspectRatio, 1 * aspectRatio, -1, 1, -1, 1)
camera.position.z = 3
renderer.resize()

//Clear canvas
renderer.gl.clearColor(0, 0, 0, 0)

let time = 0

const rotateY = document.getElementById('rotateY')
const rotateX = document.getElementById('rotateX')

rotateY.addEventListener('input', event => {
	cubeMesh.setRotationY(event.target.value)
})

rotateX.addEventListener('input', event => {
	cubeMesh.setRotationX(event.target.value)
})

const draw = () => {
	renderer.render(volume, camera)
	time += 0.1
	//sphereMesh.setRotationX(time * 3)
	//sphereMesh.setRotationY(-time * 4)
	//cubeMesh.setRotationX(time * 3)
	//cubeMesh.setRotationY(-time * 4)
	//tetraMesh.setRotationX(time * 3)
	tetraMesh.setRotationX(-time * 4)
	//sphereMesh.shader.uniforms.uTime.value = time
	//cameraX.value = Math.cos(time/4)
	//camera.position.x = Math.cos(time/4)
	//cameraY.value = Math.sin(time/4)
	//camera.position.y = Math.sin(time/4)
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
