<img src="/documentation/assets/img/icon.png?raw=true" width="120" style="max-width: 100%;">

# Sandbox
A simple WebGL library for creating 3D scenes.

## Demo
Open the index.html file to view a demo of the essential features.

## Getting Started
To create a 3D scene in Sandbox you will need a few things:
1. A canvas element
2. A Renderer object
3. A Camera object
4. At least one Mesh consisting of both geometry data and a shader program
5. A Volume to contain meshes

### Creating a Renderer object
A Renderer's constructor requires the canvas element as an argument to be the render target. The renderer has a 'resize' method that can be called whenever the canvas dimensions have changed. The 'pixelRatio' attribute can be set to account for high-density displays; by default the pixel ratio is set to either the display's pixel ratio or a value of 2 depending on which is smaller. The 'depthTest' and 'faceCulling' attributes are exposed from the OpenGL implementation for additional customization.
```javascript
const canvas = document.getElementById('webgl-canvas')
const renderer = new Sandbox.Renderer(canvas)

//Methods and attributes
renderer.resize()
renderer.pixelRatio = 2.0
renderer.depthTest = true
renderer.faceCulling = true
```

### Creating a Camera object
Sandbox includes two types of Camera objects, a Perspective Camera and an Orthographic Camera. Common to both Camera types are a few methods and attributes:
- A 'position' object containing 'x', 'y', and 'z' attributes
- A 'rotation' object containing 'x', 'y', and 'z' attributes
- A 'lookAtEnabled' flag to determine if the current 'lookAt' target should be used
- A 'createMatrix' method that regenerates the Camera's local matrix based on current viewing frustum attributes
- A 'setViewProjectionMatrix' method that regenerates the viewProjection matrix based on the current local matrix
- A 'setNear' method used to set the near plane of the viewing frustum
- A 'setFar' method used to set the far plane of the viewing frustum
- A 'setPosition' method that takes 'x', 'y', and 'z' arguments
- A 'setRotationX' method to set the Camera's X rotation
- A 'setRotationY' method to set the Camera's Y rotation
- A 'setRotationZ' method to set the Camera's Z rotation
- A 'lookAt' method which takes a Mesh target to force the Camera to center the target in its field of view regardless of position

#### The Perspective Camera
A Perspective Camera requires four arguments:
1. A 'fieldOfView'
2. An 'aspectRatio'
3. A 'near' plane location
4. A 'far' plane location
```javascript
const camera = new Sandbox.Perspective(35, 1.85, 0.1, 100)
```

#### The Orthographic Camera
A Perspective Camera requires six arguments:
1. A 'left' plane location
2. A 'right' plane location
3. A 'bottom' plane location
4. A 'top' plane location
5. A 'near' plane location
6. A 'far' plane location
```javascript
const camera = new Sandbox.Orthographic(-1, 1, -1, 1, -1, 1)
```

## License
Licensed under [the MIT license](LICENSE.md).


