(() => {
  // src/shaders/triangle/vertex.glsl
  var vertex_default = "attribute vec4 aPosition;\nattribute vec3 aColor;\n\nuniform mat4 uMatrix;\n\nvarying vec3 vColor;\n\nvoid main() {\n	vec4 position = uMatrix * aPosition;\n	gl_Position = position;\n\n	vColor = aColor;\n}";

  // src/shaders/triangle/fragment.glsl
  var fragment_default = "precision mediump float;\n\nvarying vec3 vColor;\n\nvoid main() {\n	gl_FragColor = vec4(vColor, 1.0);\n}";

  // src/shaders/plane/vertex.glsl
  var vertex_default2 = "attribute vec4 aPosition;\n\nuniform mat4 uMatrix;\n\nvarying vec4 vPos;\n\nvoid main() {\n	vec4 position = uMatrix * aPosition;\n	gl_Position = position;\n	vPos = aPosition;\n}";

  // src/shaders/plane/fragment.glsl
  var fragment_default2 = "precision mediump float;\n\nuniform vec2 uResolution;\n\nvarying vec4 vPos;\n\nvoid main() {\n	vec2 fragmentPos = gl_FragCoord.xy / uResolution;\n	gl_FragColor = vec4(fragmentPos.x, fragmentPos.y, 0.0, 1.0);\n}";

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
        return true;
      }
      return false;
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
        for (const uniform in object.shader.uniforms) {
          if (uniform === "uMatrix") {
            this.gl.uniformMatrix4fv(object.shader.uniforms[uniform].location, false, object.matrix);
          } else {
            switch (object.shader.uniforms[uniform].type) {
              case "1f":
                this.gl.uniform1f(object.shader.uniforms[uniform].location, object.shader.uniforms[uniform].value);
                break;
              case "2f":
                this.gl.uniform2f(object.shader.uniforms[uniform].location, object.shader.uniforms[uniform].value[0], object.shader.uniforms[uniform].value[1]);
                break;
              case "3f":
                this.gl.uniform2f(object.shader.uniforms[uniform].location, object.shader.uniforms[uniform].value[0], object.shader.uniforms[uniform].value[1], object.shader.uniforms[uniform].value[2]);
                break;
              case "mat3":
                this.gl.uniformMatrix3fv(object.shader.uniforms[uniform].location, false, object.shader.uniforms[uniform].value);
                break;
              case "mat4":
                this.gl.uniformMatrix4fv(object.shader.uniforms[uniform].location, false, object.shader.uniforms[uniform].value);
                break;
              default:
                break;
            }
          }
        }
        const primitiveType = this.gl[object.drawMode];
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

  // src/js/modules/Matrix.js
  var Matrix = class {
    static multiply(a, b) {
      const b00 = b[0 * 4 + 0];
      const b01 = b[0 * 4 + 1];
      const b02 = b[0 * 4 + 2];
      const b03 = b[0 * 4 + 3];
      const b10 = b[1 * 4 + 0];
      const b11 = b[1 * 4 + 1];
      const b12 = b[1 * 4 + 2];
      const b13 = b[1 * 4 + 3];
      const b20 = b[2 * 4 + 0];
      const b21 = b[2 * 4 + 1];
      const b22 = b[2 * 4 + 2];
      const b23 = b[2 * 4 + 3];
      const b30 = b[3 * 4 + 0];
      const b31 = b[3 * 4 + 1];
      const b32 = b[3 * 4 + 2];
      const b33 = b[3 * 4 + 3];
      const a00 = a[0 * 4 + 0];
      const a01 = a[0 * 4 + 1];
      const a02 = a[0 * 4 + 2];
      const a03 = a[0 * 4 + 3];
      const a10 = a[1 * 4 + 0];
      const a11 = a[1 * 4 + 1];
      const a12 = a[1 * 4 + 2];
      const a13 = a[1 * 4 + 3];
      const a20 = a[2 * 4 + 0];
      const a21 = a[2 * 4 + 1];
      const a22 = a[2 * 4 + 2];
      const a23 = a[2 * 4 + 3];
      const a30 = a[3 * 4 + 0];
      const a31 = a[3 * 4 + 1];
      const a32 = a[3 * 4 + 2];
      const a33 = a[3 * 4 + 3];
      return [
        b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
        b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
        b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
        b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
        b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
        b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
        b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
        b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
        b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
        b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
        b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
        b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
        b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
        b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
        b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
        b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33
      ];
    }
    static identity() {
      return [
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ];
    }
    static translate(tx, ty, tz) {
      return [
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        tx,
        ty,
        tz,
        1
      ];
    }
    static rotateX(angle) {
      const radians = angle * Math.PI / 180;
      const cos = Math.cos(radians);
      const sin = Math.sin(radians);
      return [
        1,
        0,
        0,
        0,
        0,
        cos,
        sin,
        0,
        0,
        -sin,
        cos,
        0,
        0,
        0,
        0,
        1
      ];
    }
    static rotateY(angle) {
      const radians = angle * Math.PI / 180;
      const cos = Math.cos(radians);
      const sin = Math.sin(radians);
      return [
        cos,
        0,
        -sin,
        0,
        0,
        1,
        0,
        0,
        sin,
        0,
        cos,
        0,
        0,
        0,
        0,
        1
      ];
    }
    static rotateZ(angle) {
      const radians = angle * Math.PI / 180;
      const cos = Math.cos(radians);
      const sin = Math.sin(radians);
      return [
        cos,
        sin,
        0,
        0,
        -sin,
        cos,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ];
    }
    static scale(sx, sy, sz) {
      return [
        sx,
        0,
        0,
        0,
        0,
        sy,
        0,
        0,
        0,
        0,
        sz,
        0,
        0,
        0,
        0,
        1
      ];
    }
  };

  // src/js/modules/Mesh.js
  var Mesh = class {
    constructor(geometry2, shader) {
      this.geometry = geometry2;
      this.shader = shader;
      this.position = {
        x: 0,
        y: 0,
        z: 0
      };
      this.rotation = {
        x: 0,
        y: 0,
        z: 0
      };
      this.scale = {
        x: 1,
        y: 1,
        z: 1
      };
      this.matrix = Matrix.identity();
      this._setAttributeData();
      this._setUniformData();
      this._setDrawMode();
    }
    _setAttributeData() {
      for (const attribute in this.geometry.attributes) {
        this.geometry.attributes[attribute].location = this.shader.gl.getAttribLocation(this.shader.program, this.geometry.attributes[attribute].name);
        this.geometry.attributes[attribute].buffer = this.shader.gl.createBuffer();
        this.shader.gl.bindBuffer(this.shader.gl.ARRAY_BUFFER, this.geometry.attributes[attribute].buffer);
        this.shader.gl.bufferData(this.shader.gl.ARRAY_BUFFER, this.geometry.attributes[attribute].data, this.shader.gl.STATIC_DRAW);
      }
    }
    _setUniformData() {
      if (this.shader.uniforms) {
        for (const uniform in this.shader.uniforms) {
          this.shader.uniforms[uniform].location = this.shader.gl.getUniformLocation(this.shader.program, this.shader.uniforms[uniform].name);
        }
      }
    }
    _setDrawMode() {
      this.drawMode = this.geometry.type ?? "TRIANGLES";
    }
    _recalculateModelMatrix() {
      const identity = Matrix.identity();
      const translation = Matrix.translate(this.position.x, this.position.y, this.position.z);
      const rotationX = Matrix.rotateX(this.rotation.x);
      const rotationY = Matrix.rotateY(this.rotation.y);
      const rotationZ = Matrix.rotateZ(this.rotation.z);
      const scale = Matrix.scale(this.scale.x, this.scale.y, this.scale.z);
      let matrix = Matrix.multiply(identity, translation);
      matrix = Matrix.multiply(matrix, rotationX);
      matrix = Matrix.multiply(matrix, rotationY);
      matrix = Matrix.multiply(matrix, rotationZ);
      matrix = Matrix.multiply(matrix, scale);
      this.matrix = matrix;
    }
    setPosition(x, y, z) {
      this.position = { x, y, z };
      this._recalculateModelMatrix();
    }
    setRotationX(angle) {
      this.rotation.x = angle;
      this._recalculateModelMatrix();
    }
    setRotationY(angle) {
      this.rotation.y = angle;
      this._recalculateModelMatrix();
    }
    setRotationZ(angle) {
      this.rotation.z = angle;
      this._recalculateModelMatrix();
    }
    setScale(x, y, z) {
      this.scale = { x, y, z };
      this._recalculateModelMatrix();
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

  // src/js/modules/Circle.js
  var Circle = class extends Geometry {
    constructor(radius, segments) {
      const positions = [];
      positions.push(0, 0, 0);
      for (let i = 0; i < segments; i++) {
        const x = Math.cos(i * Math.PI / (segments / 2)) * radius;
        const y = Math.sin(i * Math.PI / (segments / 2)) * radius;
        const z = 0;
        positions.push(x, y, z);
      }
      positions.push(Math.cos(0) * radius, Math.sin(0) * radius, 0);
      super(positions);
      this.type = "TRIANGLE_FAN";
    }
  };

  // src/js/modules/Program.js
  var programId = 0;
  var Program = class {
    constructor(gl, vertex, fragment) {
      const vertexShader = this._createShader(gl, gl.VERTEX_SHADER, vertex);
      const fragmentShader = this._createShader(gl, gl.FRAGMENT_SHADER, fragment);
      this.gl = gl;
      this.id = programId++;
      this.program = this._createProgram(gl, vertexShader, fragmentShader);
      this.uniforms = {
        uMatrix: {
          name: "uMatrix",
          value: null,
          type: "mat4"
        }
      };
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
    setUniform(name, value, type) {
      this.uniforms[name] = {
        name,
        value,
        type
      };
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
  Sandbox.Circle = Circle;
  Sandbox.Program = Program;

  // src/js/main.js
  var aspectRatio = window.innerWidth / window.innerHeight;
  var canvas = document.getElementById("webgl");
  var renderer = new Sandbox.Renderer(canvas);
  var length = 1;
  var height = length * Math.sqrt(3) / 2;
  var geometry = new Sandbox.Geometry([
    -(length / 2),
    -height / 2,
    0,
    length / 2,
    -height / 2,
    0,
    0,
    height / 2,
    0
  ]);
  geometry.setAttribute("aColor", new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1]), 3);
  var triangleShader = new Sandbox.Program(renderer.gl, vertex_default, fragment_default);
  var triangleMesh = new Sandbox.Mesh(geometry, triangleShader);
  var volume = new Sandbox.Volume();
  volume.add(triangleMesh);
  var plane = new Sandbox.Plane(0.625, 0.625, 1, 1);
  var planeShader = new Sandbox.Program(renderer.gl, vertex_default2, fragment_default2);
  planeShader.setUniform("uResolution", [canvas.clientWidth, canvas.clientHeight], "2f");
  var planeMesh = new Sandbox.Mesh(plane, planeShader);
  planeMesh.setPosition(-0.5, 0.5, 0);
  volume.add(planeMesh);
  var circle = new Sandbox.Circle(0.375, 64);
  var circleMesh = new Sandbox.Mesh(circle, planeShader);
  circleMesh.setPosition(0.5, 0, 0);
  volume.add(circleMesh);
  renderer.resize();
  renderer.gl.clearColor(0, 0, 0, 0);
  renderer.gl.clear(renderer.gl.COLOR_BUFFER_BIT);
  var time = 0;
  var draw = () => {
    renderer.render(volume);
    time += 0.01;
    triangleMesh.setScale((Math.sin(time) + 1) / 2, (Math.sin(time) + 1) / 2, 1);
    planeMesh.setRotationZ(time * 100);
    circleMesh.setPosition(0.5, Math.cos(time) * 0.5, 0);
    window.requestAnimationFrame(draw);
  };
  window.addEventListener("resize", () => {
    if (renderer.resize()) {
      planeShader.uniforms.uResolution.value = [canvas.clientWidth, canvas.clientHeight];
    }
  });
  window.requestAnimationFrame(draw);
})();
