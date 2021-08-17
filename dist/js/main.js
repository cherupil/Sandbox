(() => {
  // src/shaders/triangle/vertex.glsl
  var vertex_default = "// an attribute will receive data from a buffer\nattribute vec4 aPosition;\nattribute vec3 aColor;\n\nvarying vec3 vColor;\n\n// all shaders have a main function\nvoid main() {\n\n	// gl_Position is a special variable a vertex shader\n	// is responsible for setting\n	gl_Position = aPosition;\n\n	vColor = aColor;\n}";

  // src/shaders/triangle/fragment.glsl
  var fragment_default = "// fragment shaders don't have a default precision so we need\n// to pick one. mediump is a good default\nprecision mediump float;\n\nvarying vec3 vColor;\n\nvoid main() {\n	// gl_FragColor is a special variable a fragment shader\n	// is responsible for setting\n	gl_FragColor = vec4(vColor, 1.0); // return reddish-purple\n}";

  // src/shaders/plane/vertex.glsl
  var vertex_default2 = "// an attribute will receive data from a buffer\nattribute vec4 aPosition;\n\n// all shaders have a main function\nvoid main() {\n\n	// gl_Position is a special variable a vertex shader\n	// is responsible for setting\n	gl_Position = aPosition;\n}";

  // src/shaders/plane/fragment.glsl
  var fragment_default2 = "// fragment shaders don't have a default precision so we need\n// to pick one. mediump is a good default\nprecision mediump float;\n\nvoid main() {\n	// gl_FragColor is a special variable a fragment shader\n	// is responsible for setting\n	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // return reddish-purple\n}";

  // src/js/modules/Renderer.js
  var Renderer = class {
    constructor(element) {
      this.gl = element.getContext("webgl", {
        powerPreference: "high-performance"
      });
      this.resize = this.resize.bind(this);
      this.render = this.render.bind(this);
    }
    resize() {
      const displayWidth = this.gl.canvas.clientWidth;
      const displayHeight = this.gl.canvas.clientHeight;
      const needsResize = this.gl.canvas.width !== displayWidth || this.gl.canvas.height !== displayHeight;
      if (needsResize) {
        this.gl.canvas.width = displayWidth;
        this.gl.canvas.height = displayHeight;
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
      }
    }
    render(volume2) {
      let lastShader = null;
      let lastBuffer = null;
      for (const object of volume2.objects) {
        let bindBuffers = false;
        if (object.shader.program !== lastShader) {
          this.gl.useProgram(object.shader.program);
          lastShader = object.shader.program;
          bindBuffers = true;
        }
        if (bindBuffers || object.geometry.attributes != lastBuffer) {
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
          lastBuffer = object.geometry.attributes;
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
      this.objects.sort((a, b) => {
        const bufferDiff = a.geometry.id - b.geometry.id;
        if (bufferDiff) {
          return bufferDiff;
        }
        return a.shader.id - b.shader.id;
      });
    }
  };

  // src/js/modules/Mesh.js
  var Mesh = class {
    constructor(gl, geometry3, shader) {
      this.gl = gl;
      this.geometry = geometry3;
      this.shader = shader;
      this._setAttributeData();
    }
    _setAttributeData() {
      for (const attribute in this.geometry.attributes) {
        this.geometry.attributes[attribute].location = this.gl.getAttribLocation(this.shader.program, this.geometry.attributes[attribute].name);
        this.geometry.attributes[attribute].buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.geometry.attributes[attribute].buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.geometry.attributes[attribute].data, this.gl.STATIC_DRAW);
      }
    }
  };

  // src/js/modules/Geometry.js
  var geometryId = 0;
  var Geometry = class {
    constructor(positions) {
      this.id = geometryId++;
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

  // src/js/modules/Plane.js
  var Plane = class extends Geometry {
    constructor(width, height2, widthSegments, heightSegments) {
      const positions = [];
      const segmentWidth = width / widthSegments;
      const segmentHeight = height2 / heightSegments;
      for (let i = 0; i < heightSegments; i++) {
        for (let j = 0; j < widthSegments; j++) {
          const x1 = j * segmentWidth - width / 2;
          const y1 = i * segmentHeight - height2 / 2;
          const z = 0;
          const x2 = (j + 1) * segmentWidth - width / 2;
          const y2 = y1;
          const x3 = x1;
          const y3 = (i + 1) * segmentHeight - height2 / 2;
          const x4 = x1;
          const y4 = y3;
          const x5 = x2;
          const y5 = y2;
          const x6 = x2;
          const y6 = y3;
          positions.push(x1, y1, z, x2, y2, z, x3, y3, z, x4, y4, z, x5, y5, z, x6, y6, z);
        }
      }
      super(positions);
    }
  };

  // src/js/modules/Program.js
  var programId = 0;
  var Program = class {
    constructor(gl, vertex, fragment) {
      const vertexShader = this._createShader(gl, gl.VERTEX_SHADER, vertex);
      const fragmentShader = this._createShader(gl, gl.FRAGMENT_SHADER, fragment);
      this.id = programId++;
      this.program = this._createProgram(gl, vertexShader, fragmentShader);
    }
    _createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
      if (success) {
        return shader;
      }
      console.log(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
    }
    _createProgram(gl, vertexShader, fragmentShader) {
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

  // src/js/modules/Sandbox.js
  var Sandbox = class {
    static createColor(r, g, b) {
      return {
        r: r / 255,
        g: g / 255,
        b: b / 255
      };
    }
  };
  Sandbox.Renderer = Renderer;
  Sandbox.Volume = Volume;
  Sandbox.Mesh = Mesh;
  Sandbox.Geometry = Geometry;
  Sandbox.Plane = Plane;
  Sandbox.Program = Program;

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
  var triangleShader = new Sandbox.Program(renderer.gl, vertex_default, fragment_default);
  var triangleMesh = new Sandbox.Mesh(renderer.gl, geometry, triangleShader);
  var volume = new Sandbox.Volume();
  volume.add(triangleMesh);
  length = 0.5;
  var geometry2 = new Sandbox.Geometry([
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
  geometry2.setAttribute("aColor", new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]), 3);
  var triangleMesh2 = new Sandbox.Mesh(renderer.gl, geometry2, triangleShader);
  var plane = new Sandbox.Plane(0.5, 0.5, 1, 1);
  var planeShader = new Sandbox.Program(renderer.gl, vertex_default2, fragment_default2);
  var planeMesh = new Sandbox.Mesh(renderer.gl, plane, planeShader);
  volume.add(planeMesh);
  volume.add(triangleMesh);
  volume.add(planeMesh);
  volume.add(triangleMesh);
  volume.add(triangleMesh2);
  volume.add(planeMesh);
  volume.add(triangleMesh);
  volume.add(triangleMesh2);
  renderer.resize();
  renderer.gl.clearColor(0, 0, 0, 0);
  renderer.gl.clear(renderer.gl.COLOR_BUFFER_BIT);
  var draw = () => {
    renderer.render(volume);
    window.requestAnimationFrame(draw);
  };
  window.addEventListener("resize", renderer.resize);
  window.requestAnimationFrame(draw);
})();
