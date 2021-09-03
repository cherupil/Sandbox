import cubeShaderVertex from '../shaders/cube/vertex.glsl'
import cubeShaderFragment from '../shaders/cube/fragment.glsl'

import Sandbox from './modules/Sandbox.js'

let aspectRatio = window.innerWidth / window.innerHeight
const canvas = document.getElementById('webgl')
const renderer = new Sandbox.Renderer(canvas)
renderer.setPixelRatio(1)

//Cube
const cube = new Sandbox.Cube(0.5, 0.5, 0.5, 1, 1, 1)
cube.setAttribute('aColor', new Float32Array([
	//Front
	1.0, 1.0, 1.0,
	0.0, 1.0, 0.0,
	0.0, 0.0, 1.0,
	0.0, 0.0, 1.0,
	0.0, 1.0, 0.0,
	1.0, 0.0, 0.0,

	//Back
	0.0, 1.0, 1.0,
	1.0, 0.0, 1.0,
	1.0, 1.0, 1.0,
	1.0, 0.0, 1.0,
	1.0, 1.0, 0.0,
	1.0, 1.0, 1.0,

	//Top
	1.0, 0.0, 1.0,
	0.0, 0.0, 1.0,
	1.0, 1.0, 0.0,
	0.0, 0.0, 1.0,
	1.0, 0.0, 0.0,
	1.0, 1.0, 0.0,

	//Bottom
	0.0, 1.0, 1.0,
	1.0, 1.0, 1.0,
	1.0, 1.0, 1.0,
	1.0, 1.0, 1.0,
	1.0, 1.0, 1.0,
	0.0, 1.0, 0.0,

	//Right
	1.0, 1.0, 1.0,
	1.0, 1.0, 0.0,
	0.0, 1.0, 0.0,
	1.0, 1.0, 0.0,
	1.0, 0.0, 0.0,
	0.0, 1.0, 0.0,

	//Left
	0.0, 1.0, 1.0,
	1.0, 1.0, 1.0,
	1.0, 0.0, 1.0,
	1.0, 0.0, 1.0,
	1.0, 1.0, 1.0,
	0.0, 0.0, 1.0
]), 3)
const cubeShader = new Sandbox.Program(renderer.gl, cubeShaderVertex, cubeShaderFragment)
cubeShader.setUniform('uTime', 0, '1f')
cubeShader.setUniform('uRed', 1, '1f')
cubeShader.setUniform('uGreen', .25, '1f')
cubeShader.setUniform('uBlue', .5, '1f')

const volume = new Sandbox.Volume()

for (let i = 0; i < 100; i++) {
	const cubeInstance = new Sandbox.Mesh(cube, cubeShader)
	cubeInstance.setPosition(
		(Math.random() * 6) - 3,
		(Math.random() * 2) - 1,
		-(Math.random() * 100),
	)
	let rand = Math.random()
	if (rand > 0.5) {
		rand = 1
	} else {
		rand = -1
	}
	cubeInstance.rand = rand
	cubeInstance.factor = Math.random() * 0.5
	volume.add(cubeInstance)
}

//Set Viewport
const camera = new Sandbox.Perspective(70, aspectRatio, 0.1, 100)
renderer.resize()

//Clear canvas
renderer.gl.clearColor(0, 0, 0, 0)

let time = 0

const draw = () => {
	renderer.render(volume, camera)
	time += 0.1
	camera.setPosition(Math.cos(time/10) * 50, 0, -50 + Math.sin(time/10) * 50)
	camera.setRotationY((Math.atan2(Math.cos(time/10), Math.sin(time/10)) * 180 / Math.PI))
	console.log(camera.rotation.y)
	//cubeMesh.shader.uniforms.uTime.value = time
	for (const object in volume.objects) {
		//volume.objects[object].position.z += 0.075
		volume.objects[object].rotation.x += volume.objects[object].factor * volume.objects[object].rand
		volume.objects[object].rotation.z += volume.objects[object].factor * volume.objects[object].rand

	}
	//cubeMesh.setRotationX(time * 3)
	//cubeMesh.setRotationY(time * 4.5)
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
const xPos = document.getElementById('xPos')
const yPos = document.getElementById('yPos')
const zPos = document.getElementById('zPos')

const mouse = {
	x1: 0,
	y1: 0,
	x2: 0,
	y2: 0
}

zPos.addEventListener('input', event => {
	cubeMesh.position.z = event.target.value
})

xPos.addEventListener('input', event => {
	cubeMesh.position.x = event.target.value
})

yPos.addEventListener('input', event => {
	cubeMesh.position.y = event.target.value
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

/*window.setTimeout(() => {
	controls.classList.add('active')
}, 500)*/
