(() => {
  // src/shaders/sphere/vertex.glsl
  var vertex_default = "attribute vec4 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aUV;\n\nuniform mat4 uMatrix;\nuniform float uTime;\n\nvarying vec3 vNormal;\nvarying vec2 vUV;\n\nvoid main() {\n	vec4 position = uMatrix * aPosition;\n	gl_Position = position;\n	vNormal = aNormal;\n	vUV = aUV;\n}";

  // src/shaders/sphere/fragment.glsl
  var fragment_default = "precision mediump float;\n\nvarying vec3 vNormal;\nvarying vec2 vUV;\n\nvoid main() {\n	gl_FragColor = vec4(vUV, 0.0, 1.0);\n}";

  // src/js/modules/Renderer.js
  var Renderer = class {
    constructor(element) {
      this.gl = element.getContext("webgl", {
        powerPreference: "high-performance"
      });
      this.resize = this.resize.bind(this);
      this.render = this.render.bind(this);
      this.pixelRatio = 2;
    }
    setPixelRatio(ratio) {
      this.pixelRatio = ratio;
    }
    resize() {
      const displayWidth = this.gl.canvas.clientWidth * this.pixelRatio;
      const displayHeight = this.gl.canvas.clientHeight * this.pixelRatio;
      const needsResize = this.gl.canvas.width * this.pixel !== displayWidth || this.gl.canvas.height * this.pixelRatio !== displayHeight;
      if (needsResize) {
        this.gl.canvas.width = displayWidth;
        this.gl.canvas.height = displayHeight;
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        return true;
      }
      return false;
    }
    render(volume2, camera2) {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
      this.gl.enable(this.gl.CULL_FACE);
      this.gl.enable(this.gl.DEPTH_TEST);
      let lastShader = null;
      let lastBuffer = null;
      for (const object of volume2.objects) {
        camera2.setViewProjectionMatrix();
        object.setProjectionMatrix(camera2.viewProjectionMatrix);
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
            this.gl.uniformMatrix4fv(object.shader.uniforms[uniform].location, false, object.projectionMatrix);
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
    static inverse(m) {
      const result = new Float32Array(16);
      const m00 = m[0 * 4 + 0];
      const m01 = m[0 * 4 + 1];
      const m02 = m[0 * 4 + 2];
      const m03 = m[0 * 4 + 3];
      const m10 = m[1 * 4 + 0];
      const m11 = m[1 * 4 + 1];
      const m12 = m[1 * 4 + 2];
      const m13 = m[1 * 4 + 3];
      const m20 = m[2 * 4 + 0];
      const m21 = m[2 * 4 + 1];
      const m22 = m[2 * 4 + 2];
      const m23 = m[2 * 4 + 3];
      const m30 = m[3 * 4 + 0];
      const m31 = m[3 * 4 + 1];
      const m32 = m[3 * 4 + 2];
      const m33 = m[3 * 4 + 3];
      const tmp_0 = m22 * m33;
      const tmp_1 = m32 * m23;
      const tmp_2 = m12 * m33;
      const tmp_3 = m32 * m13;
      const tmp_4 = m12 * m23;
      const tmp_5 = m22 * m13;
      const tmp_6 = m02 * m33;
      const tmp_7 = m32 * m03;
      const tmp_8 = m02 * m23;
      const tmp_9 = m22 * m03;
      const tmp_10 = m02 * m13;
      const tmp_11 = m12 * m03;
      const tmp_12 = m20 * m31;
      const tmp_13 = m30 * m21;
      const tmp_14 = m10 * m31;
      const tmp_15 = m30 * m11;
      const tmp_16 = m10 * m21;
      const tmp_17 = m20 * m11;
      const tmp_18 = m00 * m31;
      const tmp_19 = m30 * m01;
      const tmp_20 = m00 * m21;
      const tmp_21 = m20 * m01;
      const tmp_22 = m00 * m11;
      const tmp_23 = m10 * m01;
      const t0 = tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31 - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
      const t1 = tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31 - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
      const t2 = tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31 - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
      const t3 = tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21 - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
      const d = 1 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
      result[0] = d * t0;
      result[1] = d * t1;
      result[2] = d * t2;
      result[3] = d * t3;
      result[4] = d * (tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30 - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
      result[5] = d * (tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30 - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
      result[6] = d * (tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30 - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
      result[7] = d * (tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20 - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
      result[8] = d * (tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33 - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
      result[9] = d * (tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33 - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
      result[10] = d * (tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33 - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
      result[11] = d * (tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23 - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
      result[12] = d * (tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12 - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
      result[13] = d * (tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22 - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
      result[14] = d * (tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02 - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
      result[15] = d * (tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12 - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));
      return result;
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

  // src/js/modules/Orthographic.js
  var Orthographic = class {
    constructor(left, right, bottom, top, near, far) {
      this.left = left;
      this.right = right;
      this.bottom = bottom;
      this.top = top;
      this.near = near;
      this.far = far;
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
      this.viewMatrix = Matrix.identity();
      this._createMatrix();
    }
    _createMatrix() {
      this.matrix = [
        2 / (this.right - this.left),
        0,
        0,
        0,
        0,
        2 / (this.top - this.bottom),
        0,
        0,
        0,
        0,
        -2 / (this.far - this.near),
        0,
        -(this.right + this.left) / (this.right - this.left),
        -(this.top + this.bottom) / (this.top - this.bottom),
        -(this.far + this.near) / (this.far - this.near),
        1
      ];
    }
    _recalculateViewMatrix() {
      const identity = Matrix.identity();
      const translation = Matrix.translate(this.position.x, this.position.y, this.position.z);
      const rotationX = Matrix.rotateX(this.rotation.x);
      const rotationY = Matrix.rotateY(this.rotation.y);
      const rotationZ = Matrix.rotateZ(this.rotation.z);
      let matrix = Matrix.multiply(identity, translation);
      matrix = Matrix.multiply(matrix, rotationX);
      matrix = Matrix.multiply(matrix, rotationY);
      matrix = Matrix.multiply(matrix, rotationZ);
      this.viewMatrix = Matrix.inverse(matrix);
    }
    setViewProjectionMatrix() {
      this._recalculateViewMatrix();
      this.viewProjectionMatrix = Matrix.multiply(this.matrix, this.viewMatrix);
    }
    setLeft(left) {
      this.left = left;
      this._createMatrix();
    }
    setRight(right) {
      this.right = right;
      this._createMatrix();
    }
    setBottom(bottom) {
      this.bottom = bottom;
      this._createMatrix();
    }
    setTop(top) {
      this.top = top;
      this._createMatrix();
    }
    setNear(near) {
      this.near = near;
      this._createMatrix();
    }
    setFar(far) {
      this.far = far;
      this._createMatrix();
    }
    setPosition(x, y, z) {
      this.position = { x, y, z };
      this.setViewProjectionMatrix();
    }
    setRotationX(angle) {
      this.rotation.x = angle;
      this.setViewProjectionMatrix();
    }
    setRotationY(angle) {
      this.rotation.y = angle;
      this.setViewProjectionMatrix();
    }
    setRotationZ(angle) {
      this.rotation.z = angle;
      this.setViewProjectionMatrix();
    }
  };

  // src/js/modules/Perspective.js
  var Perspective = class {
    constructor(fieldOfView, aspectRatio2, near, far) {
      this.fieldOfView = fieldOfView * Math.PI / 180;
      this.aspectRatio = aspectRatio2;
      this.near = near;
      this.far = far;
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
      this.viewMatrix = Matrix.identity();
      this._createMatrix();
    }
    _createMatrix() {
      this.top = this.near * Math.tan(this.fieldOfView / 2);
      this.bottom = -this.top;
      this.right = this.top * this.aspectRatio;
      this.left = -this.right;
      this.matrix = [
        2 * this.near / (this.right - this.left),
        0,
        0,
        0,
        0,
        2 * this.near / (this.top - this.bottom),
        0,
        0,
        0,
        0,
        -(this.far + this.near) / (this.far - this.near),
        -1,
        -this.near * (this.right + this.left) / (this.right - this.left),
        -this.near * (this.top + this.bottom) / (this.top - this.bottom),
        2 * this.far * this.near / (this.near - this.far),
        0
      ];
    }
    _recalculateViewMatrix() {
      const identity = Matrix.identity();
      const translation = Matrix.translate(this.position.x, this.position.y, this.position.z);
      const rotationX = Matrix.rotateX(this.rotation.x);
      const rotationY = Matrix.rotateY(this.rotation.y);
      const rotationZ = Matrix.rotateZ(this.rotation.z);
      let matrix = Matrix.multiply(identity, translation);
      matrix = Matrix.multiply(matrix, rotationX);
      matrix = Matrix.multiply(matrix, rotationY);
      matrix = Matrix.multiply(matrix, rotationZ);
      this.viewMatrix = Matrix.inverse(matrix);
    }
    setViewProjectionMatrix() {
      this._recalculateViewMatrix();
      this.viewProjectionMatrix = Matrix.multiply(this.matrix, this.viewMatrix);
    }
    setFieldOfView(fieldOfView) {
      this.fieldOfView = fieldOfView * Math.PI / 180;
      this._createMatrix();
      this.setViewProjectionMatrix();
    }
    setAspectRatio(aspectRatio2) {
      this.aspectRatio = aspectRatio2;
      this._createMatrix();
      this.setViewProjectionMatrix();
    }
    setNear(near) {
      this.near = near;
      this._createMatrix();
      this.setViewProjectionMatrix();
    }
    setFar(far) {
      this.far = far;
      this._createMatrix();
      this.setViewProjectionMatrix();
    }
    setPosition(x, y, z) {
      this.position = { x, y, z };
      this.setViewProjectionMatrix();
    }
    setRotationX(angle) {
      this.rotation.x = angle;
      this.setViewProjectionMatrix();
    }
    setRotationY(angle) {
      this.rotation.y = angle;
      this.setViewProjectionMatrix();
    }
    setRotationZ(angle) {
      this.rotation.z = angle;
      this.setViewProjectionMatrix();
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
    constructor(geometry, shader) {
      this.geometry = geometry;
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
      this.localMatrix = Matrix.identity();
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
      this.localMatrix = matrix;
    }
    setProjectionMatrix(matrix) {
      this._recalculateModelMatrix();
      this.projectionMatrix = Matrix.multiply(matrix, this.localMatrix);
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
      this._generateNormals(positions);
    }
    setAttribute(name, data, size) {
      this.attributes[name] = {
        name,
        data,
        size,
        count: data.length / size
      };
    }
    _generateNormals(positions) {
      const normals = [];
      for (var i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        const magnitude = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
        normals.push(x / magnitude, y / magnitude, z / magnitude);
      }
      this.setAttribute("aNormal", new Float32Array(normals), 3);
    }
  };

  // src/js/modules/Plane.js
  var Plane = class extends Geometry {
    constructor(width, height, widthSegments, heightSegments) {
      const positions = [];
      const segmentWidth = width / widthSegments;
      const segmentHeight = height / heightSegments;
      for (let i = 0; i < heightSegments; i++) {
        for (let j = 0; j < widthSegments; j++) {
          const x1 = j * segmentWidth - width / 2;
          const y1 = i * segmentHeight - height / 2;
          const z = 0;
          const x2 = (j + 1) * segmentWidth - width / 2;
          const y2 = y1;
          const x3 = x1;
          const y3 = (i + 1) * segmentHeight - height / 2;
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
      const uvs = [];
      for (let i = 0; i < positions.length; i += 3) {
        const x = (positions[i] + width / 2) / width;
        const y = (positions[i + 1] + height / 2) / height;
        uvs.push(x, y);
      }
      this.setAttribute("aUV", new Float32Array(uvs), 2);
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

  // src/js/modules/Tetrahedron.js
  var Tetra = class extends Geometry {
    constructor(size) {
      const positions = [];
      const height = Math.sqrt(3) / 2 * size;
      positions.push(-size / 2, -(size * Math.sqrt(3)) / 6, size * Math.sqrt(3) / 6, size / 2, -(size * Math.sqrt(3)) / 6, size * Math.sqrt(3) / 6, 0, size * Math.sqrt(3) / 3, 0, size / 2, -(size * Math.sqrt(3)) / 6, size * Math.sqrt(3) / 6, 0, -(size * Math.sqrt(3)) / 6, -(size * Math.sqrt(3)) / 3, 0, size * Math.sqrt(3) / 3, 0, 0, -(size * Math.sqrt(3)) / 6, -(size * Math.sqrt(3)) / 3, -size / 2, -(size * Math.sqrt(3)) / 6, size * Math.sqrt(3) / 6, 0, size * Math.sqrt(3) / 3, 0, -size / 2, -(size * Math.sqrt(3)) / 6, size * Math.sqrt(3) / 6, 0, -(size * Math.sqrt(3)) / 6, -(size * Math.sqrt(3)) / 3, size / 2, -(size * Math.sqrt(3)) / 6, size * Math.sqrt(3) / 6);
      super(positions);
      const uvs = [];
      for (let i = 0; i < positions.length; i += 9) {
        if (i === 27) {
          uvs.push(1, 0, 0.5, 0.5, 0, 0);
        } else {
          uvs.push(0, 0, 1, 0, 0.5, 0.5);
        }
      }
      this.setAttribute("aUV", new Float32Array(uvs), 2);
    }
  };

  // src/js/modules/Cube.js
  var Cube = class extends Geometry {
    constructor(width, height, depth, widthSegments, heightSegments, depthSegments) {
      const positions = [];
      const uvs = [];
      createSide("x", "y", "z", width, height, depth, widthSegments, heightSegments, "front", false, false);
      createSide("x", "y", "z", width, height, -depth, widthSegments, heightSegments, "back", true, false);
      createSide("x", "z", "y", width, depth, height, widthSegments, depthSegments, "back", false, true);
      createSide("x", "z", "y", width, depth, -height, widthSegments, depthSegments, "front", false, false);
      createSide("z", "y", "x", depth, height, width, depthSegments, heightSegments, "back", true, false);
      createSide("z", "y", "x", depth, height, -width, depthSegments, heightSegments, "front", false, false);
      function createSide(x, y, z, xLength, yLength, depth2, xSegments, ySegments, direction, uvFlipX, uvFlipY) {
        const segmentX = xLength / xSegments;
        const segmentY = yLength / ySegments;
        const z1 = depth2 / 2;
        for (let i = 0; i < ySegments; i++) {
          for (let j = 0; j < xSegments; j++) {
            const point = {};
            point[x] = [];
            point[y] = [];
            point[z] = [];
            const x1 = j * segmentX - xLength / 2;
            const y1 = i * segmentY - yLength / 2;
            const x2 = (j + 1) * segmentX - xLength / 2;
            const y2 = (i + 1) * segmentY - yLength / 2;
            if (direction === "front") {
              point[x].push(x1);
              point[y].push(y1);
              point[z].push(z1);
              point[x].push(x2);
              point[y].push(y1);
              point[z].push(z1);
              point[x].push(x1);
              point[y].push(y2);
              point[z].push(z1);
              point[x].push(x1);
              point[y].push(y2);
              point[z].push(z1);
              point[x].push(x2);
              point[y].push(y1);
              point[z].push(z1);
              point[x].push(x2);
              point[y].push(y2);
              point[z].push(z1);
            } else if (direction === "back") {
              point[x].push(x2);
              point[y].push(y1);
              point[z].push(z1);
              point[x].push(x1);
              point[y].push(y1);
              point[z].push(z1);
              point[x].push(x2);
              point[y].push(y2);
              point[z].push(z1);
              point[x].push(x2);
              point[y].push(y2);
              point[z].push(z1);
              point[x].push(x1);
              point[y].push(y1);
              point[z].push(z1);
              point[x].push(x1);
              point[y].push(y2);
              point[z].push(z1);
            }
            positions.push(point.x[0], point.y[0], point.z[0], point.x[1], point.y[1], point.z[1], point.x[2], point.y[2], point.z[2], point.x[3], point.y[3], point.z[3], point.x[4], point.y[4], point.z[4], point.x[5], point.y[5], point.z[5]);
            for (let k = 0; k < 6; k++) {
              let uvX;
              let uvY;
              if (uvFlipX) {
                uvX = 1 - (point[x][k] + xLength / 2) / xLength;
              } else {
                uvX = (point[x][k] + xLength / 2) / xLength;
              }
              if (uvFlipY) {
                uvY = 1 - (point[y][k] + yLength / 2) / yLength;
              } else {
                uvY = (point[y][k] + yLength / 2) / yLength;
              }
              uvs.push(uvX, uvY);
            }
          }
        }
      }
      super(positions);
      this.setAttribute("aUV", new Float32Array(uvs), 2);
    }
  };

  // src/js/modules/Sphere.js
  var Sphere = class extends Geometry {
    constructor(radius, segments) {
      const positions = [];
      const segmentSize = Math.PI * 2 / segments;
      for (let i = 0; i <= segments; i++) {
        for (let j = 0; j <= segments; j++) {
          const x1 = radius * Math.cos(j * segmentSize) * Math.sin(i * segmentSize);
          const y1 = radius * Math.cos(i * segmentSize);
          const z1 = radius * Math.sin(j * segmentSize) * Math.sin(i * segmentSize);
          const x2 = radius * Math.cos(j * segmentSize) * Math.sin((i + 1) * segmentSize);
          const y2 = radius * Math.cos((i + 1) * segmentSize);
          const z2 = radius * Math.sin(j * segmentSize) * Math.sin((i + 1) * segmentSize);
          const x3 = radius * Math.cos((j + 1) * segmentSize) * Math.sin((i + 1) * segmentSize);
          const y3 = radius * Math.cos((i + 1) * segmentSize);
          const z3 = radius * Math.sin((j + 1) * segmentSize) * Math.sin((i + 1) * segmentSize);
          const x4 = x1;
          const y4 = y1;
          const z4 = z1;
          const x5 = x3;
          const y5 = y3;
          const z5 = z3;
          const x6 = radius * Math.cos((j + 1) * segmentSize) * Math.sin(i * segmentSize);
          const y6 = radius * Math.cos(i * segmentSize);
          const z6 = radius * Math.sin((j + 1) * segmentSize) * Math.sin(i * segmentSize);
          positions.push(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4, x5, y5, z5, x6, y6, z6);
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
  Sandbox.Orthographic = Orthographic;
  Sandbox.Perspective = Perspective;
  Sandbox.Volume = Volume;
  Sandbox.Mesh = Mesh;
  Sandbox.Geometry = Geometry;
  Sandbox.Plane = Plane;
  Sandbox.Circle = Circle;
  Sandbox.Tetrahedron = Tetra;
  Sandbox.Cube = Cube;
  Sandbox.Sphere = Sphere;
  Sandbox.Program = Program;

  // src/js/main.js
  var aspectRatio = window.innerWidth / window.innerHeight;
  var canvas = document.getElementById("webgl");
  var renderer = new Sandbox.Renderer(canvas);
  renderer.setPixelRatio(1);
  var volume = new Sandbox.Volume();
  var sphereShader = new Sandbox.Program(renderer.gl, vertex_default, fragment_default);
  sphereShader.setUniform("uTime", 0, "1f");
  var cube = new Sandbox.Cube(1, 2, 3, 10, 12, 16);
  var cubeMesh = new Sandbox.Mesh(cube, sphereShader);
  cubeMesh.setScale(0.5, 0.5, 0.5);
  var tetra = new Sandbox.Tetrahedron(1);
  var tetraMesh = new Sandbox.Mesh(tetra, sphereShader);
  volume.add(tetraMesh);
  tetraMesh.position.y = -(Math.sqrt(3) / 2) / 6;
  console.log(cubeMesh);
  var camera = new Sandbox.Perspective(70, aspectRatio, 0.1, 100);
  camera.position.z = 3;
  renderer.resize();
  renderer.gl.clearColor(0, 0, 0, 0);
  var time = 0;
  var rotateY = document.getElementById("rotateY");
  var rotateX = document.getElementById("rotateX");
  rotateY.addEventListener("input", (event) => {
    cubeMesh.setRotationY(event.target.value);
  });
  rotateX.addEventListener("input", (event) => {
    cubeMesh.setRotationX(event.target.value);
  });
  var draw = () => {
    renderer.render(volume, camera);
    time += 0.1;
    tetraMesh.setRotationX(-time * 4);
    window.requestAnimationFrame(draw);
  };
  window.addEventListener("resize", () => {
    if (renderer.resize()) {
      aspectRatio = renderer.gl.canvas.width / renderer.gl.canvas.height;
      camera.setAspectRatio(aspectRatio);
    }
  });
  window.requestAnimationFrame(draw);
  var controls = document.querySelector(".controls");
  var mouse = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
  };
  controls.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("controls")) {
      event.preventDefault();
      mouse.x1 = event.clientX;
      mouse.y1 = event.clientY;
      document.onmouseup = removeDrag;
      document.onmousemove = dragControls;
    }
  });
  var dragControls = (event) => {
    event.preventDefault();
    mouse.x2 = mouse.x1 - event.clientX;
    mouse.y2 = mouse.y1 - event.clientY;
    mouse.x1 = event.clientX;
    mouse.y1 = event.clientY;
    controls.style.top = `${controls.offsetTop - mouse.y2}px`;
    controls.style.bottom = `auto`;
    controls.style.left = `${controls.offsetLeft - mouse.x2}px`;
  };
  var removeDrag = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };
  window.setTimeout(() => {
    controls.classList.add("active");
  }, 500);
})();
