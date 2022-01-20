import Sandbox from '../../../dist/js/sandbox.min.js'
import primitiveVertex from '../../shaders/primitive/vertex.glsl'
import primitiveFragment from '../../shaders/primitive/fragment.glsl'

let now = 0
let time = 0
let then = 0

/*
Primitives
*/

//Plane
const planeCanvas = document.getElementById('primitive--plane')
const planeRenderer = new Sandbox.Renderer(planeCanvas)
planeRenderer.resize()
const planeVolume = new Sandbox.Volume()

const planeCamera = new Sandbox.Perspective(35, 1, 0.1, 100)
planeCamera.setPosition(0, 0, 6)
const planeShader = new Sandbox.Program(planeRenderer.gl, primitiveVertex, primitiveFragment)

const planeGeometry = new Sandbox.Plane(2, 2, 1, 1)
const planeMesh = new Sandbox.Mesh(planeGeometry, planeShader)
planeVolume.add(planeMesh)

//Circle
const circleCanvas = document.getElementById('primitive--circle')
const circleRenderer = new Sandbox.Renderer(circleCanvas)
circleRenderer.resize()
const circleVolume = new Sandbox.Volume()

const circleCamera = new Sandbox.Perspective(35, 1, 0.1, 100)
circleCamera.setPosition(0, 0, 6)
const circleShader = new Sandbox.Program(circleRenderer.gl, primitiveVertex, primitiveFragment)

const circleGeometry = new Sandbox.Circle(1, 64)
const circleMesh = new Sandbox.Mesh(circleGeometry, circleShader)
circleVolume.add(circleMesh)

//Tetrahedron
const tetrahedronCanvas = document.getElementById('primitive--tetrahedron')
const tetrahedronRenderer = new Sandbox.Renderer(tetrahedronCanvas)
tetrahedronRenderer.resize()
const tetrahedronVolume = new Sandbox.Volume()

const tetrahedronCamera = new Sandbox.Perspective(35, 1, 0.1, 100)
tetrahedronCamera.setPosition(0, 0, 6)
const tetrahedronShader = new Sandbox.Program(tetrahedronRenderer.gl, primitiveVertex, primitiveFragment)

const tetrahedronGeometry = new Sandbox.Tetrahedron(2)
const tetrahedronMesh = new Sandbox.Mesh(tetrahedronGeometry, tetrahedronShader)
tetrahedronVolume.add(tetrahedronMesh)

//Cube
const cubeCanvas = document.getElementById('primitive--cube')
const cubeRenderer = new Sandbox.Renderer(cubeCanvas)
cubeRenderer.resize()
const cubeVolume = new Sandbox.Volume()

const cubeCamera = new Sandbox.Perspective(35, 1, 0.1, 100)
cubeCamera.setPosition(0, 0, 6)
const cubeShader = new Sandbox.Program(cubeRenderer.gl, primitiveVertex, primitiveFragment)

const cubeGeometry = new Sandbox.Cube(2, 2, 2, 1, 1, 1)
const cubeMesh = new Sandbox.Mesh(cubeGeometry, cubeShader)
cubeVolume.add(cubeMesh)

//Sphere
const sphereCanvas = document.getElementById('primitive--sphere')
const sphereRenderer = new Sandbox.Renderer(sphereCanvas)
sphereRenderer.resize()
const sphereVolume = new Sandbox.Volume()

const sphereCamera = new Sandbox.Perspective(35, 1, 0.1, 100)
sphereCamera.setPosition(0, 0, 6)
const sphereShader = new Sandbox.Program(sphereRenderer.gl, primitiveVertex, primitiveFragment)

const sphereGeometry = new Sandbox.Sphere(1, 64)
const sphereMesh = new Sandbox.Mesh(sphereGeometry, sphereShader)
sphereVolume.add(sphereMesh)

//Cylinder
const cylinderCanvas = document.getElementById('primitive--cylinder')
const cylinderRenderer = new Sandbox.Renderer(cylinderCanvas)
cylinderRenderer.resize()
const cylinderVolume = new Sandbox.Volume()

const cylinderCamera = new Sandbox.Perspective(35, 1, 0.1, 100)
cylinderCamera.setPosition(0, 0, 6)
const cylinderShader = new Sandbox.Program(cylinderRenderer.gl, primitiveVertex, primitiveFragment)

const cylinderGeometry = new Sandbox.Cylinder(1, 2, 64)
const cylinderMesh = new Sandbox.Mesh(cylinderGeometry, cylinderShader)
cylinderVolume.add(cylinderMesh)

const update = (current) => {
    now = current
    time += (now - then)
    then = now

    //Plane
    planeMesh.setRotationX(Math.sin(time / 1000) * 30)
    planeMesh.setRotationY(Math.cos(time / 1200) * 30)
    planeRenderer.gl.clearColor(0, 0, 0, 0)
    planeRenderer.render(planeVolume, planeCamera)

    //Circle
    circleMesh.setRotationX(Math.sin(time / 1000) * 30)
    circleMesh.setRotationY(Math.cos(time / 1200) * 30)
    circleRenderer.gl.clearColor(0, 0, 0, 0)
    circleRenderer.render(circleVolume, circleCamera)

    //Tetrahedron
    tetrahedronMesh.setRotationX(Math.sin(time / 1000) * 30)
    tetrahedronMesh.setRotationY(Math.cos(time / 1200) * 30)
    tetrahedronRenderer.gl.clearColor(0, 0, 0, 0)
    tetrahedronRenderer.render(tetrahedronVolume, tetrahedronCamera)

    //Cube
    cubeMesh.setRotationX(Math.sin(time / 1000) * 30)
    cubeMesh.setRotationY(Math.cos(time / 1200) * 30)
    cubeRenderer.gl.clearColor(0, 0, 0, 0)
    cubeRenderer.render(cubeVolume, cubeCamera)

    //Sphere
    sphereMesh.setRotationX(Math.sin(time / 1000) * 30)
    sphereMesh.setRotationY(Math.cos(time / 1200) * 30)
    sphereRenderer.gl.clearColor(0, 0, 0, 0)
    sphereRenderer.render(sphereVolume, sphereCamera)

    //Cylinder
    cylinderMesh.setRotationX(Math.sin(time / 1000) * 30)
    cylinderMesh.setRotationY(Math.cos(time / 1200) * 30)
    cylinderRenderer.gl.clearColor(0, 0, 0, 0)
    cylinderRenderer.render(cylinderVolume, cylinderCamera)
    window.requestAnimationFrame(update)
}

window.requestAnimationFrame(update)