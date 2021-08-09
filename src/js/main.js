import Sandbox from './modules/Sandbox.js'

const webgl = document.getElementById('webgl')
const glContext = webgl.getContext('webgl', {
	powerPreference: 'high-performance'
})

console.log(Sandbox)