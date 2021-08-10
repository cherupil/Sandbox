(() => {
  // src/shaders/test/vertex.glsl
  var vertex_default = "// an attribute will receive data from a buffer\nattribute vec4 aPosition;\nattribute vec3 aColor;\n\nvarying vec3 vColor;\n\n// all shaders have a main function\nvoid main() {\n\n	// gl_Position is a special variable a vertex shader\n	// is responsible for setting\n	gl_Position = aPosition;\n\n	vColor = aColor;\n}";

  // src/shaders/test/fragment.glsl
  var fragment_default = "// fragment shaders don't have a default precision so we need\n// to pick one. mediump is a good default\nprecision mediump float;\n\nvarying vec3 vColor;\n\nvoid main() {\n	// gl_FragColor is a special variable a fragment shader\n	// is responsible for setting\n	gl_FragColor = vec4(vColor, 1.0); // return reddish-purple\n}";

  // src/js/modules/Renderer.js
  var Renderer = class {
    constructor(element) {
      this.gl = element.getContext("webgl", {
        powerPreference: "high-performance"
      });
    }
    resize() {
      const displayWidth = this.gl.canvas.clientWidth;
      const displayHeight = this.gl.canvas.clientHeight;
      const needsResize = this.gl.canvas.width !== displayWidth || this.gl.canvas.height !== displayHeight;
      if (needsResize) {
        this.gl.canvas.width = displayWidth;
        this.gl.canvas.height = displayHeight;
      }
    }
    render(volume2) {
      for (const object of volume2.objects) {
        this.gl.useProgram(object.shader);
        for (const attribute in object.geometry.attributes) {
          this.gl.enableVertexAttribArray(object.geometry.attributes[attribute].location);
          this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.geometry.attributes[attribute].buffer);
          const size = object.geometry.attributes[attribute].size;
          const type = this.gl.FLOAT;
          const normalize = false;
          const stride = 0;
          const offset = 0;
          this.gl.vertexAttribPointer(object.geometry.attributes[attribute].location, size, type, normalize, stride, offset);
        }
        const primitiveType = this.gl.TRIANGLES;
        const vertexOffset = 0;
        const count = object.geometry.attributes.aPosition.count;
        this.gl.drawArrays(primitiveType, vertexOffset, count);
      }
    }
  };

  // src/js/modules/Volume.js
  var Volume = class {
    constructor() {
      this.objects = [];
    }
    add(object) {
      this.objects.push(object);
    }
  };

  // src/js/modules/Mesh.js
  var Mesh = class {
    constructor(gl, geometry2, shader2) {
      this.gl = gl;
      this.geometry = geometry2;
      this.shader = shader2;
      this._setAttributeData();
    }
    _setAttributeData() {
      for (const attribute in this.geometry.attributes) {
        this.geometry.attributes[attribute].location = this.gl.getAttribLocation(this.shader, this.geometry.attributes[attribute].name);
        this.geometry.attributes[attribute].buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.geometry.attributes[attribute].buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.geometry.attributes[attribute].data, this.gl.STATIC_DRAW);
      }
    }
  };

  // src/js/modules/Shader.js
  var Shader = class {
    static create(gl, vertex, fragment) {
      const vertexShader = this._createShader(gl, gl.VERTEX_SHADER, vertex);
      const fragmentShader = this._createShader(gl, gl.FRAGMENT_SHADER, fragment);
      return this._createProgram(gl, vertexShader, fragmentShader);
    }
    static _createShader(gl, type, source) {
      const shader2 = gl.createShader(type);
      gl.shaderSource(shader2, source);
      gl.compileShader(shader2);
      const success = gl.getShaderParameter(shader2, gl.COMPILE_STATUS);
      if (success) {
        return shader2;
      }
      console.log(gl.getShaderInfoLog(shader2));
      gl.deleteShader(shader2);
    }
    static _createProgram(gl, vertexShader, fragmentShader) {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      const success = gl.getProgramParameter(program, gl.LINK_STATUS);
      if (success) {
        return program;
      }
      console.log(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
    }
  };

  // src/js/modules/Geometry.js
  var Geometry = class {
    constructor(positions) {
      this.attributes = {};
      this.setAttribute("aPosition", new Float32Array(positions), 3);
    }
    setAttribute(name, data, size) {
      this.attributes[name] = {
        name,
        data,
        size,
        count: data.length / size
      };
    }
  };

  // src/js/modules/Sandbox.js
  var Sandbox = class {
  };
  Sandbox.Renderer = Renderer;
  Sandbox.Volume = Volume;
  Sandbox.Mesh = Mesh;
  Sandbox.Geometry = Geometry;
  Sandbox.Shader = Shader;

  // src/js/main.js
  var aspectRatio = window.innerWidth / window.innerHeight;
  var canvas = document.getElementById("webgl");
  var renderer = new Sandbox.Renderer(canvas);
  var length = 1;
  var height = length * Math.sqrt(3) / 2;
  var geometry = new Sandbox.Geometry([
    -(length / 2) / aspectRatio,
    -height / 2,
    0,
    length / 2 / aspectRatio,
    -height / 2,
    0,
    0,
    height / 2,
    0
  ]);
  geometry.setAttribute("aColor", new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]), 3);
  var shader = Sandbox.Shader.create(renderer.gl, vertex_default, fragment_default);
  var mesh = new Sandbox.Mesh(renderer.gl, geometry, shader);
  var volume = new Sandbox.Volume();
  volume.add(mesh);
  renderer.resize();
  renderer.gl.viewport(0, 0, renderer.gl.canvas.width, renderer.gl.canvas.height);
  renderer.gl.clearColor(0, 0, 0, 0);
  renderer.gl.clear(renderer.gl.COLOR_BUFFER_BIT);
  renderer.render(volume);
})();
