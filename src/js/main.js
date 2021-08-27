import planeShaderVertex from '../shaders/plane/vertex.glsl'
import planeShaderFragment from '../shaders/plane/fragment.glsl'

import cubeShaderVertex from '../shaders/cube/vertex.glsl'
import cubeShaderFragment from '../shaders/cube/fragment.glsl'

import Sandbox from './modules/Sandbox.js'

let aspectRatio = window.innerWidth / window.innerHeight
const canvas = document.getElementById('webgl')
const renderer = new Sandbox.Renderer(canvas)
renderer.setPixelRatio(1)

//Plane
const circle = new Sandbox.Circle(0.5, 64)
const planeShader = new Sandbox.Program(renderer.gl, planeShaderVertex, planeShaderFragment)
planeShader.setUniform('uTime', 0, '1f')
planeShader.setUniform('uResolution', [renderer.gl.canvas.width, renderer.gl.canvas.height], '2f')
planeShader.setUniform('uRed', 1, '1f')
planeShader.setUniform('uGreen', .25, '1f')
planeShader.setUniform('uBlue', .5, '1f')
const planeMesh = new Sandbox.Mesh(circle, planeShader)
planeMesh.setPosition(0, 0, 0.625)

//Cube
const cube = new Sandbox.Cube(1, 1, 1, 64, 64, 64)
const cubeShader = new Sandbox.Program(renderer.gl, cubeShaderVertex, cubeShaderFragment)
cubeShader.setUniform('uTime', 0, '1f')
cubeShader.setUniform('uRed', 1, '1f')
cubeShader.setUniform('uGreen', .25, '1f')
cubeShader.setUniform('uBlue', .5, '1f')
const cubeMesh = new Sandbox.Mesh(cube, cubeShader)
cubeMesh.setRotationX(37.5)
cubeMesh.setRotationY(45)

const volume = new Sandbox.Volume()
volume.add(cubeMesh)
volume.add(planeMesh)

//Set Viewport
const camera = new Sandbox.Orthographic(-1 * aspectRatio, 1 * aspectRatio, -1, 1, -1, 1)
renderer.resize()
planeMesh.shader.uniforms.uResolution.value = [renderer.gl.canvas.width, renderer.gl.canvas.height]

//Clear canvas
renderer.gl.clearColor(0, 0, 0, 0)

let time = 0

const draw = () => {
	renderer.render(volume, camera)
	time += 0.1
	planeMesh.shader.uniforms.uTime.value = time
	cubeMesh.shader.uniforms.uTime.value = time
	window.requestAnimationFrame(draw)
}

window.addEventListener('resize', () => {
	if (renderer.resize()) {
		aspectRatio = renderer.gl.canvas.width / renderer.gl.canvas.height
		camera.setLeft(-1 * aspectRatio)
		camera.setRight(1 * aspectRatio)
		planeMesh.shader.uniforms.uResolution.value = [renderer.gl.canvas.width, renderer.gl.canvas.height]
	}
})
window.requestAnimationFrame(draw)

const controls = document.querySelector('.controls')
const red = document.getElementById('red')
const green = document.getElementById('green')
const blue = document.getElementById('blue')

const mouse = {
	x1: 0,
	y1: 0,
	x2: 0,
	y2: 0
}

red.addEventListener('input', event => {
	cubeMesh.shader.uniforms.uRed.value = event.target.value
	planeMesh.shader.uniforms.uRed.value = event.target.value
})

green.addEventListener('input', event => {
	cubeMesh.shader.uniforms.uGreen.value = event.target.value
	planeMesh.shader.uniforms.uGreen.value = event.target.value
})

blue.addEventListener('input', event => {
	cubeMesh.shader.uniforms.uBlue.value = event.target.value
	planeMesh.shader.uniforms.uBlue.value = event.target.value
})

controls.addEventListener('mousedown', event => {
	if (event.target.classList.contains('controls')) {
		mouse.x1 = event.clientX
		mouse.y1 = event.clientY
		document.onmouseup = removeDrag
		document.onmousemove = dragControls
	}
})

const dragControls = (event) => {
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
