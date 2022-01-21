(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // dist/js/sandbox.min.js
  var require_sandbox_min = __commonJS({
    "dist/js/sandbox.min.js"(exports) {
      var gt = Object.defineProperty;
      var dt = (M) => gt(M, "__esModule", { value: true });
      var bt = (M, t) => {
        dt(M);
        for (var s in t)
          gt(M, s, { get: t[s], enumerable: true });
      };
      bt(exports, { default: () => E });
      var Z = class {
        constructor(t) {
          this.gl = t.getContext("webgl", { powerPreference: "high-performance" }), this.resize = this.resize.bind(this), this.render = this.render.bind(this), this.depthTest = true, this.faceCulling = true, this.pixelRatio = Math.min(window.devicePixelRatio, 2), this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true), this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 1), this.framebuffer = null;
        }
        setPixelRatio(t) {
          this.pixelRatio = t;
        }
        setFrameBuffer(t) {
          t !== null ? this.framebuffer = t.buffer : this.framebuffer = null;
        }
        resize() {
          let t = this.gl.canvas.clientWidth * this.pixelRatio, s = this.gl.canvas.clientHeight * this.pixelRatio;
          return this.gl.canvas.width * this.pixelRatio !== t || this.gl.canvas.height * this.pixelRatio !== s ? (this.gl.canvas.width = t, this.gl.canvas.height = s, this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height), true) : false;
        }
        render(t, s) {
          this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer), this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT), this.faceCulling && this.gl.enable(this.gl.CULL_FACE), this.depthTest && this.gl.enable(this.gl.DEPTH_TEST), this.gl.enable(this.gl.BLEND), this.gl.blendEquation(this.gl.FUNC_ADD), this.gl.blendFunc(this.gl.ONE_MINUS_CONSTANT_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
          let i = null, r = null;
          s.setViewProjectionMatrix();
          for (let e of t.objects) {
            e.setProjectionMatrix(s.viewProjectionMatrix);
            let h = false;
            if (e.shader.program !== i && (this.gl.useProgram(e.shader.program), i = e.shader.program, h = true), h || e.attributes != r) {
              for (let o in e.attributes) {
                this.gl.enableVertexAttribArray(e.attributes[o].location), this.gl.bindBuffer(this.gl.ARRAY_BUFFER, e.attributes[o].buffer);
                let l = e.attributes[o].size, p = this.gl.FLOAT, m = false, x = 0, g = 0;
                this.gl.vertexAttribPointer(e.attributes[o].location, l, p, m, x, g);
              }
              r = e.attributes;
            }
            for (let o in e.uniforms)
              if (o === "uViewProjectionMatrix")
                this.gl.uniformMatrix4fv(e.uniforms[o].location, false, e.projectionMatrix);
              else if (o === "uNormalMatrix")
                this.gl.uniformMatrix4fv(e.uniforms[o].location, false, e.normalMatrix);
              else if (o === "uLocalMatrix")
                this.gl.uniformMatrix4fv(e.uniforms[o].location, false, e.localMatrix);
              else
                switch (e.uniforms[o].type) {
                  case "1f":
                    this.gl.uniform1f(e.uniforms[o].location, e.uniforms[o].value);
                    break;
                  case "2f":
                    this.gl.uniform2f(e.uniforms[o].location, e.uniforms[o].value[0], e.uniforms[o].value[1]);
                    break;
                  case "3f":
                    this.gl.uniform3f(e.uniforms[o].location, e.uniforms[o].value[0], e.uniforms[o].value[1], e.uniforms[o].value[2]);
                    break;
                  case "4f":
                    this.gl.uniform4f(e.uniforms[o].location, e.uniforms[o].value[0], e.uniforms[o].value[1], e.uniforms[o].value[2], e.uniforms[o].value[3]);
                    break;
                  case "mat3":
                    this.gl.uniformMatrix3fv(e.uniforms[o].location, false, e.uniforms[o].value);
                    break;
                  case "mat4":
                    this.gl.uniformMatrix4fv(e.uniforms[o].location, false, e.uniforms[o].value);
                    break;
                  case "tex":
                    this.gl.uniform1i(e.uniforms[o].location, e.uniforms[o].value.id), this.gl.activeTexture(this.gl.TEXTURE0 + e.uniforms[o].value.id), this.gl.bindTexture(this.gl.TEXTURE_2D, e.uniforms[o].value.texture);
                  default:
                    break;
                }
            let n = this.gl[e.drawMode], a = 0, u = e.attributes.aPosition.count;
            this.gl.drawArrays(n, a, u);
          }
        }
      };
      var B = class {
        static cross(t, s) {
          return [t[1] * s[2] - t[2] * s[1], t[2] * s[0] - t[0] * s[2], t[0] * s[1] - t[1] * s[0]];
        }
        static subtract(t, s) {
          return [t[0] - s[0], t[1] - s[1], t[2] - s[2]];
        }
        static normalize(t) {
          let s = Math.sqrt(t[0] ** 2 + t[1] ** 2 + t[2] ** 2);
          return s > 1e-5 ? [t[0] / s, t[1] / s, t[2] / s] : [0, 0, 0];
        }
      };
      var f = class {
        static multiply(t, s) {
          let i = s[0 * 4 + 0], r = s[0 * 4 + 1], e = s[0 * 4 + 2], h = s[0 * 4 + 3], n = s[1 * 4 + 0], a = s[1 * 4 + 1], u = s[1 * 4 + 2], o = s[1 * 4 + 3], l = s[2 * 4 + 0], p = s[2 * 4 + 1], m = s[2 * 4 + 2], x = s[2 * 4 + 3], g = s[3 * 4 + 0], b = s[3 * 4 + 1], y = s[3 * 4 + 2], _ = s[3 * 4 + 3], P = t[0 * 4 + 0], j = t[0 * 4 + 1], N = t[0 * 4 + 2], U = t[0 * 4 + 3], d = t[1 * 4 + 0], R = t[1 * 4 + 1], T = t[1 * 4 + 2], c = t[1 * 4 + 3], A = t[2 * 4 + 0], w = t[2 * 4 + 1], I = t[2 * 4 + 2], F = t[2 * 4 + 3], v = t[3 * 4 + 0], X = t[3 * 4 + 1], k = t[3 * 4 + 2], G = t[3 * 4 + 3];
          return [i * P + r * d + e * A + h * v, i * j + r * R + e * w + h * X, i * N + r * T + e * I + h * k, i * U + r * c + e * F + h * G, n * P + a * d + u * A + o * v, n * j + a * R + u * w + o * X, n * N + a * T + u * I + o * k, n * U + a * c + u * F + o * G, l * P + p * d + m * A + x * v, l * j + p * R + m * w + x * X, l * N + p * T + m * I + x * k, l * U + p * c + m * F + x * G, g * P + b * d + y * A + _ * v, g * j + b * R + y * w + _ * X, g * N + b * T + y * I + _ * k, g * U + b * c + y * F + _ * G];
        }
        static identity() {
          return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        }
        static inverse(t) {
          let s = new Float32Array(16), i = t[0 * 4 + 0], r = t[0 * 4 + 1], e = t[0 * 4 + 2], h = t[0 * 4 + 3], n = t[1 * 4 + 0], a = t[1 * 4 + 1], u = t[1 * 4 + 2], o = t[1 * 4 + 3], l = t[2 * 4 + 0], p = t[2 * 4 + 1], m = t[2 * 4 + 2], x = t[2 * 4 + 3], g = t[3 * 4 + 0], b = t[3 * 4 + 1], y = t[3 * 4 + 2], _ = t[3 * 4 + 3], P = m * _, j = y * x, N = u * _, U = y * o, d = u * x, R = m * o, T = e * _, c = y * h, A = e * x, w = m * h, I = e * o, F = u * h, v = l * b, X = g * p, k = n * b, G = g * a, S = n * p, q = l * a, L = i * b, z = g * r, V = i * p, O = l * r, Y = i * a, H = n * r, ft = P * a + U * p + d * b - (j * a + N * p + R * b), pt = j * r + T * p + w * b - (P * r + c * p + A * b), mt = N * r + c * a + I * b - (U * r + T * a + F * b), xt = R * r + A * a + F * p - (d * r + w * a + I * p), D = 1 / (i * ft + n * pt + l * mt + g * xt);
          return s[0] = D * ft, s[1] = D * pt, s[2] = D * mt, s[3] = D * xt, s[4] = D * (j * n + N * l + R * g - (P * n + U * l + d * g)), s[5] = D * (P * i + c * l + A * g - (j * i + T * l + w * g)), s[6] = D * (U * i + T * n + F * g - (N * i + c * n + I * g)), s[7] = D * (d * i + w * n + I * l - (R * i + A * n + F * l)), s[8] = D * (v * o + G * x + S * _ - (X * o + k * x + q * _)), s[9] = D * (X * h + L * x + O * _ - (v * h + z * x + V * _)), s[10] = D * (k * h + z * o + Y * _ - (G * h + L * o + H * _)), s[11] = D * (q * h + V * o + H * x - (S * h + O * o + Y * x)), s[12] = D * (k * m + q * y + X * u - (S * y + v * u + G * m)), s[13] = D * (V * y + v * e + z * m - (L * m + O * y + X * e)), s[14] = D * (L * u + H * y + G * e - (Y * y + k * e + z * u)), s[15] = D * (Y * m + S * e + O * u - (V * u + H * m + q * e)), s;
        }
        static transpose(t) {
          return [t[0], t[4], t[8], t[12], t[1], t[5], t[9], t[13], t[2], t[6], t[10], t[14], t[3], t[7], t[11], t[15]];
        }
        static translate(t, s, i) {
          return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, s, i, 1];
        }
        static rotateX(t) {
          let s = t * Math.PI / 180, i = Math.cos(s), r = Math.sin(s);
          return [1, 0, 0, 0, 0, i, r, 0, 0, -r, i, 0, 0, 0, 0, 1];
        }
        static rotateY(t) {
          let s = t * Math.PI / 180, i = Math.cos(s), r = Math.sin(s);
          return [i, 0, -r, 0, 0, 1, 0, 0, r, 0, i, 0, 0, 0, 0, 1];
        }
        static rotateZ(t) {
          let s = t * Math.PI / 180, i = Math.cos(s), r = Math.sin(s);
          return [i, r, 0, 0, -r, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        }
        static scale(t, s, i) {
          return [t, 0, 0, 0, 0, s, 0, 0, 0, 0, i, 0, 0, 0, 0, 1];
        }
        static lookAt(t, s) {
          let i = B.normalize(B.subtract(t, s)), r = B.normalize(B.cross([0, 1, 0], i)), e = B.normalize(B.cross(i, r));
          return [r[0], r[1], r[2], 0, e[0], e[1], e[2], 0, i[0], i[1], i[2], 0, t[0], t[1], t[2], 1];
        }
      };
      var W = class {
        constructor(t, s, i, r, e, h) {
          this.left = t, this.right = s, this.bottom = i, this.top = r, this.near = e, this.far = h, this.type = "orthographic", this.position = { x: 0, y: 0, z: 0 }, this.rotation = { x: 0, y: 0, z: 0 }, this.viewMatrix = f.identity(), this.createMatrix();
        }
        createMatrix() {
          this.matrix = [2 / (this.right - this.left), 0, 0, 0, 0, 2 / (this.top - this.bottom), 0, 0, 0, 0, -2 / (this.far - this.near), 0, -(this.right + this.left) / (this.right - this.left), -(this.top + this.bottom) / (this.top - this.bottom), -(this.far + this.near) / (this.far - this.near), 1];
        }
        _recalculateViewMatrix() {
          let t = f.identity(), s = f.translate(this.position.x, this.position.y, this.position.z), i = f.rotateX(this.rotation.x), r = f.rotateY(this.rotation.y), e = f.rotateZ(this.rotation.z), h = f.multiply(t, s);
          h = f.multiply(h, i), h = f.multiply(h, r), h = f.multiply(h, e), this.lookAtEnabled && (h = f.lookAt([h[12], h[13], h[14]], [this.lookAtTarget.localMatrix[12], this.lookAtTarget.localMatrix[13], this.lookAtTarget.localMatrix[14]])), this.viewMatrix = f.inverse(h);
        }
        setViewProjectionMatrix() {
          this._recalculateViewMatrix(), this.viewProjectionMatrix = f.multiply(this.matrix, this.viewMatrix);
        }
        setLeft(t) {
          this.left = t, this.createMatrix();
        }
        setRight(t) {
          this.right = t, this.createMatrix();
        }
        setBottom(t) {
          this.bottom = t, this.createMatrix();
        }
        setTop(t) {
          this.top = t, this.createMatrix();
        }
        setNear(t) {
          this.near = t, this.createMatrix();
        }
        setFar(t) {
          this.far = t, this.createMatrix();
        }
        setPosition(t, s, i) {
          this.position = { x: t, y: s, z: i };
        }
        setRotationX(t) {
          this.rotation.x = t;
        }
        setRotationY(t) {
          this.rotation.y = t;
        }
        setRotationZ(t) {
          this.rotation.z = t;
        }
        lookAt(t) {
          this.lookAtEnabled = true, this.lookAtTarget = t;
        }
      };
      var K = class {
        constructor(t, s, i, r) {
          this.fieldOfView = t * Math.PI / 180, this.aspectRatio = s, this.near = i, this.far = r, this.type = "perspective", this.position = { x: 0, y: 0, z: 0 }, this.rotation = { x: 0, y: 0, z: 0 }, this.viewMatrix = f.identity(), this.lookAtEnabled = false, this.createMatrix();
        }
        createMatrix() {
          this.top = this.near * Math.tan(this.fieldOfView / 2), this.bottom = -this.top, this.right = this.top * this.aspectRatio, this.left = -this.right, this.matrix = [2 * this.near / (this.right - this.left), 0, 0, 0, 0, 2 * this.near / (this.top - this.bottom), 0, 0, 0, 0, -(this.far + this.near) / (this.far - this.near), -1, -this.near * (this.right + this.left) / (this.right - this.left), -this.near * (this.top + this.bottom) / (this.top - this.bottom), 2 * this.far * this.near / (this.near - this.far), 0];
        }
        _recalculateViewMatrix() {
          let t = f.identity(), s = f.translate(this.position.x, this.position.y, this.position.z), i = f.rotateX(this.rotation.x), r = f.rotateY(this.rotation.y), e = f.rotateZ(this.rotation.z), h = f.multiply(t, s);
          h = f.multiply(h, i), h = f.multiply(h, r), h = f.multiply(h, e), this.lookAtEnabled && (h = f.lookAt([h[12], h[13], h[14]], [this.lookAtTarget.localMatrix[12], this.lookAtTarget.localMatrix[13], this.lookAtTarget.localMatrix[14]])), this.viewMatrix = f.inverse(h);
        }
        setViewProjectionMatrix() {
          this._recalculateViewMatrix(), this.viewProjectionMatrix = f.multiply(this.matrix, this.viewMatrix);
        }
        setFieldOfView(t) {
          this.fieldOfView = t * Math.PI / 180, this.createMatrix();
        }
        setAspectRatio(t) {
          this.aspectRatio = t, this.createMatrix();
        }
        setNear(t) {
          this.near = t, this.createMatrix();
        }
        setFar(t) {
          this.far = t, this.createMatrix();
        }
        setPosition(t, s, i) {
          this.position = { x: t, y: s, z: i };
        }
        setRotationX(t) {
          this.rotation.x = t;
        }
        setRotationY(t) {
          this.rotation.y = t;
        }
        setRotationZ(t) {
          this.rotation.z = t;
        }
        lookAt(t) {
          this.lookAtEnabled = true, this.lookAtTarget = t;
        }
      };
      var J = class {
        constructor() {
          this.objects = [];
        }
        add(t) {
          this.objects.push(t), this.objects.sort((s, i) => {
            let r = s.geometryID - i.geometryID;
            return r || s.shader.id - i.shader.id;
          });
        }
      };
      var Q = class {
        constructor() {
          this.items = [], this.position = { x: 0, y: 0, z: 0 }, this.rotation = { x: 0, y: 0, z: 0 }, this.scale = { x: 1, y: 1, z: 1 }, this.localMatrix = f.identity();
        }
        _recalculateModelMatrix() {
          let t = f.identity(), s = f.translate(this.position.x, this.position.y, this.position.z), i = f.rotateX(this.rotation.x), r = f.rotateY(this.rotation.y), e = f.rotateZ(this.rotation.z), h = f.scale(this.scale.x, this.scale.y, this.scale.z), n = f.multiply(t, s);
          n = f.multiply(n, i), n = f.multiply(n, r), n = f.multiply(n, e), n = f.multiply(n, h), this.localMatrix = n;
        }
        setProjectionMatrix(t) {
          this._recalculateModelMatrix(), this.projectionMatrix = t;
        }
        setPosition(t, s, i) {
          this.position = { x: t, y: s, z: i }, this._recalculateModelMatrix();
        }
        setRotationX(t) {
          this.rotation.x = t, this._recalculateModelMatrix();
        }
        setRotationY(t) {
          this.rotation.y = t, this._recalculateModelMatrix();
        }
        setRotationZ(t) {
          this.rotation.z = t, this._recalculateModelMatrix();
        }
        setScale(t, s, i) {
          this.scale = { x: t, y: s, z: i }, this._recalculateModelMatrix();
        }
      };
      var $ = class {
        constructor(t, s) {
          this.geometryID = t.id, this.geometryType = t.type, this.shader = s, this.position = { x: 0, y: 0, z: 0 }, this.rotation = { x: 0, y: 0, z: 0 }, this.scale = { x: 1, y: 1, z: 1 }, this.attributes = t.attributes, this.uniforms = { uViewProjectionMatrix: { name: "uViewProjectionMatrix", value: null, type: "mat4" }, uNormalMatrix: { name: "uNormalMatrix", value: null, type: "mat4" }, uLocalMatrix: { name: "uLocalMatrix", value: null, type: "mat4" } }, this.surfaceNormals = false, this.localMatrix = f.identity(), this._setAttributeData(), this._setUniformData(), this._setDrawMode(), this._setSurfaceNormals();
        }
        _setAttributeData() {
          for (let t in this.attributes)
            this.attributes[t].location = this.shader.gl.getAttribLocation(this.shader.program, this.attributes[t].name), this.attributes[t].buffer = this.shader.gl.createBuffer(), this.shader.gl.bindBuffer(this.shader.gl.ARRAY_BUFFER, this.attributes[t].buffer), this.shader.gl.bufferData(this.shader.gl.ARRAY_BUFFER, this.attributes[t].data, this.shader.gl.STATIC_DRAW);
        }
        _setUniformData() {
          for (let t in this.uniforms)
            this.uniforms[t].location = this.shader.gl.getUniformLocation(this.shader.program, this.uniforms[t].name);
        }
        _setDrawMode() {
          this.geometryType ? this.drawMode = this.geometryType : this.drawMode = "TRIANGLES";
        }
        _setSurfaceNormals() {
          if (this.surfaceNormals) {
            let t = [];
            for (let s = 0; s < this.geometry.attributes.aNormal.data.length; s += 9) {
              let i = [this.geometry.attributes.aNormal.data[s], this.geometry.attributes.aNormal.data[s + 1], this.geometry.attributes.aNormal.data[s + 2]], r = [this.geometry.attributes.aNormal.data[s + 3], this.geometry.attributes.aNormal.data[s + 4], this.geometry.attributes.aNormal.data[s + 5]], e = [this.geometry.attributes.aNormal.data[s + 6], this.geometry.attributes.aNormal.data[s + 7], this.geometry.attributes.aNormal.data[s + 8]], h = B.subtract(r, i), n = B.subtract(e, i), a = h[1] * n[2] - h[2] * n[1], u = h[2] * n[0] - h[0] * n[2], o = h[0] * n[1] - h[1] * n[0], l = B.normalize([a, u, o]);
              t.push(l[0], l[1], l[2]), t.push(l[0], l[1], l[2]), t.push(l[0], l[1], l[2]);
            }
            this.shader.gl.bindBuffer(this.shader.gl.ARRAY_BUFFER, this.geometry.attributes.aNormal.buffer), this.shader.gl.bufferData(this.shader.gl.ARRAY_BUFFER, new Float32Array(t), this.shader.gl.STATIC_DRAW);
          }
        }
        _recalculateModelMatrix() {
          let t = f.identity(), s = f.translate(this.position.x, this.position.y, this.position.z), i = f.rotateX(this.rotation.x), r = f.rotateY(this.rotation.y), e = f.rotateZ(this.rotation.z), h = f.scale(this.scale.x, this.scale.y, this.scale.z), n = f.multiply(t, s);
          n = f.multiply(n, i), n = f.multiply(n, r), n = f.multiply(n, e), n = f.multiply(n, h), this.parentCollection ? this.localMatrix = f.multiply(this.parentCollection.localMatrix, n) : this.localMatrix = n;
        }
        _recalculateNormalMatrix() {
          this.normalMatrix = f.transpose(f.inverse(this.localMatrix));
        }
        setProjectionMatrix(t) {
          this._recalculateModelMatrix(), this._recalculateNormalMatrix(), this.projectionMatrix = t;
        }
        setPosition(t, s, i) {
          this.position = { x: t, y: s, z: i }, this._recalculateModelMatrix();
        }
        setRotationX(t) {
          this.rotation.x = t, this._recalculateModelMatrix();
        }
        setRotationY(t) {
          this.rotation.y = t, this._recalculateModelMatrix();
        }
        setRotationZ(t) {
          this.rotation.z = t, this._recalculateModelMatrix();
        }
        setScale(t, s, i) {
          this.scale = { x: t, y: s, z: i }, this._recalculateModelMatrix();
        }
        setAttribute(t, s, i) {
          this.attributes[t] = { name: t, data: s, size: i, count: s.length / i }, this._setAttributeData();
        }
        setUniform(t, s, i) {
          this.uniforms[t] = { name: t, value: s, type: i }, this._setUniformData();
        }
        setShader(t) {
          this.shader = t, this._setAttributeData(), this._setUniformData();
        }
        setParent(t) {
          if (this.parentCollection) {
            let s = this.parentCollection.items.indexOf(this);
            s >= 0 && this.parentCollection.items.splice(s, 1);
          }
          t && t.items.push(this), this.parentCollection = t;
        }
      };
      var yt = 0;
      var C = class {
        constructor(t) {
          this.id = yt++, this.attributes = {}, this.setAttribute("aPosition", new Float32Array(t), 3), this._generateNormals(t);
        }
        setAttribute(t, s, i) {
          this.attributes[t] = { name: t, data: s, size: i, count: s.length / i };
        }
        _generateNormals(t) {
          let s = [];
          for (var i = 0; i < t.length; i += 3) {
            let r = t[i], e = t[i + 1], h = t[i + 2], n = Math.sqrt(r ** 2 + e ** 2 + h ** 2);
            s.push(r / n, e / n, h / n);
          }
          this.setAttribute("aNormal", new Float32Array(s), 3);
        }
      };
      var tt = class extends C {
        constructor(t, s, i, r) {
          let e = [], h = t / i, n = s / r;
          for (let l = 0; l < r; l++)
            for (let p = 0; p < i; p++) {
              let m = p * h - t / 2, x = l * n - s / 2, g = 0, b = (p + 1) * h - t / 2, y = x, _ = m, P = (l + 1) * n - s / 2, j = m, N = P, U = b, d = y, R = b, T = P;
              e.push(m, x, g, b, y, g, _, P, g, j, N, g, U, d, g, R, T, g);
            }
          super(e);
          let a = [];
          for (var u = 0; u < e.length; u += 3) {
            let l = e[u], p = e[u + 1], m = 1, x = Math.sqrt(l ** 2 + p ** 2 + m ** 2);
            a.push(l / x, p / x, 1);
          }
          this.attributes.aNormal.data = new Float32Array(a), this.attributes.aNormal.count = a.length / 3;
          let o = [];
          for (let l = 0; l < e.length; l += 3) {
            let p = (e[l] + t / 2) / t, m = (e[l + 1] + s / 2) / s;
            o.push(p, m);
          }
          this.setAttribute("aUV", new Float32Array(o), 2);
        }
      };
      var st = class extends C {
        constructor(t, s) {
          let i = [];
          i.push(0, 0, 0);
          for (let n = 0; n < s; n++) {
            let a = Math.cos(n * Math.PI / (s / 2)) * t, u = Math.sin(n * Math.PI / (s / 2)) * t, o = 0;
            i.push(a, u, o);
          }
          i.push(Math.cos(0) * t, Math.sin(0) * t, 0);
          super(i);
          let r = [];
          for (var e = 0; e < i.length; e += 3) {
            let n = i[e], a = i[e + 1], u = 1, o = Math.sqrt(n ** 2 + a ** 2 + u ** 2);
            r.push(n / o, a / o, u / o);
          }
          this.attributes.aNormal.data = new Float32Array(r), this.attributes.aNormal.count = r.length / 3;
          let h = [];
          for (let n = 0; n < i.length; n += 3) {
            let a = (i[n] + t) / (t * 2), u = (i[n + 1] + t) / (t * 2);
            h.push(a, u);
          }
          this.setAttribute("aUV", new Float32Array(h), 2), this.type = "TRIANGLE_FAN";
        }
      };
      var it = class extends C {
        constructor(t) {
          let s = [], i = Math.sqrt(3) / 2 * t;
          s.push(-t / 2, -(t * Math.sqrt(3)) / 6, t * Math.sqrt(3) / 6, t / 2, -(t * Math.sqrt(3)) / 6, t * Math.sqrt(3) / 6, 0, t * Math.sqrt(3) / 3, 0, t / 2, -(t * Math.sqrt(3)) / 6, t * Math.sqrt(3) / 6, 0, -(t * Math.sqrt(3)) / 6, -(t * Math.sqrt(3)) / 3, 0, t * Math.sqrt(3) / 3, 0, 0, -(t * Math.sqrt(3)) / 6, -(t * Math.sqrt(3)) / 3, -t / 2, -(t * Math.sqrt(3)) / 6, t * Math.sqrt(3) / 6, 0, t * Math.sqrt(3) / 3, 0, -t / 2, -(t * Math.sqrt(3)) / 6, t * Math.sqrt(3) / 6, 0, -(t * Math.sqrt(3)) / 6, -(t * Math.sqrt(3)) / 3, t / 2, -(t * Math.sqrt(3)) / 6, t * Math.sqrt(3) / 6);
          super(s);
          let r = [];
          for (let e = 0; e < s.length; e += 9)
            e === 27 ? r.push(1, (1 - Math.sqrt(0.75)) / 2, 0.5, (1 - Math.sqrt(0.75)) / 2 + Math.sqrt(0.75), 0, (1 - Math.sqrt(0.75)) / 2) : r.push(0, (1 - Math.sqrt(0.75)) / 2, 1, (1 - Math.sqrt(0.75)) / 2, 0.5, (1 - Math.sqrt(0.75)) / 2 + Math.sqrt(0.75));
          this.setAttribute("aUV", new Float32Array(r), 2);
        }
      };
      var et = class extends C {
        constructor(t, s, i, r, e, h) {
          let n = [], a = [];
          u("x", "y", "z", t, s, i, r, e, "front", false, false), u("x", "y", "z", t, s, -i, r, e, "back", true, false), u("x", "z", "y", t, i, s, r, h, "back", false, true), u("x", "z", "y", t, i, -s, r, h, "front", false, false), u("z", "y", "x", i, s, t, h, e, "back", true, false), u("z", "y", "x", i, s, -t, h, e, "front", false, false);
          function u(o, l, p, m, x, g, b, y, _, P, j) {
            let N = m / b, U = x / y, d = g / 2;
            for (let R = 0; R < y; R++)
              for (let T = 0; T < b; T++) {
                let c = {};
                c[o] = [], c[l] = [], c[p] = [];
                let A = T * N - m / 2, w = R * U - x / 2, I = (T + 1) * N - m / 2, F = (R + 1) * U - x / 2;
                _ === "front" ? (c[o].push(A), c[l].push(w), c[p].push(d), c[o].push(I), c[l].push(w), c[p].push(d), c[o].push(A), c[l].push(F), c[p].push(d), c[o].push(A), c[l].push(F), c[p].push(d), c[o].push(I), c[l].push(w), c[p].push(d), c[o].push(I), c[l].push(F), c[p].push(d)) : _ === "back" && (c[o].push(I), c[l].push(w), c[p].push(d), c[o].push(A), c[l].push(w), c[p].push(d), c[o].push(I), c[l].push(F), c[p].push(d), c[o].push(I), c[l].push(F), c[p].push(d), c[o].push(A), c[l].push(w), c[p].push(d), c[o].push(A), c[l].push(F), c[p].push(d)), n.push(c.x[0], c.y[0], c.z[0], c.x[1], c.y[1], c.z[1], c.x[2], c.y[2], c.z[2], c.x[3], c.y[3], c.z[3], c.x[4], c.y[4], c.z[4], c.x[5], c.y[5], c.z[5]);
                for (let v = 0; v < 6; v++) {
                  let X, k;
                  P ? X = 1 - (c[o][v] + m / 2) / m : X = (c[o][v] + m / 2) / m, j ? k = 1 - (c[l][v] + x / 2) / x : k = (c[l][v] + x / 2) / x, a.push(X, k);
                }
              }
          }
          super(n);
          this.setAttribute("aUV", new Float32Array(a), 2);
        }
      };
      var rt = class extends C {
        constructor(t, s) {
          let i = [], r = [], e = Math.PI * 2 / s;
          for (let a = 0; a < s; a++)
            for (let u = 0; u < s; u++) {
              let o = t * Math.cos(u * e) * Math.sin(a * e), l = t * Math.cos(a * e), p = t * Math.sin(u * e) * Math.sin(a * e), m = t * Math.cos(u * e) * Math.sin((a + 1) * e), x = t * Math.cos((a + 1) * e), g = t * Math.sin(u * e) * Math.sin((a + 1) * e), b = t * Math.cos((u + 1) * e) * Math.sin((a + 1) * e), y = t * Math.cos((a + 1) * e), _ = t * Math.sin((u + 1) * e) * Math.sin((a + 1) * e), P = o, j = l, N = p, U = b, d = y, R = _, T = t * Math.cos((u + 1) * e) * Math.sin(a * e), c = t * Math.cos(a * e), A = t * Math.sin((u + 1) * e) * Math.sin(a * e);
              i.push(o, l, p, m, x, g, b, y, _, P, j, N, U, d, R, T, c, A);
            }
          super(i);
          for (let a = 0; a < this.attributes.aNormal.data.length; a += 3) {
            let u = 0;
            this.attributes.aNormal.data[a + 1] == -1 && this.attributes.aNormal.data[a] >= 0 ? u = -0.5 : this.attributes.aNormal.data[a + 1] == -1 && this.attributes.aNormal.data[a] < 0 && (u = 0.5);
            let o = 0.5 + Math.atan2(this.attributes.aNormal.data[a], this.attributes.aNormal.data[a + 2]) / (Math.PI * 2), l = 0.5 - Math.asin(this.attributes.aNormal.data[a + 1]) / Math.PI;
            r.push(o + u, 1 - l);
          }
          let h = 6 * 2 * s, n = 3 * (h / 4);
          for (let a = 0; a < r.length; a += h)
            a !== 0 && (r[a - n] = 1, r[a - (n - 2)] = 1, r[a - (n - 6)] = 1);
          r[r.length - n] = 1, r[r.length - (n - 2)] = 1, r[r.length - (n - 6)] = 1, this.setAttribute("aUV", new Float32Array(r), 2);
        }
      };
      var ot = class extends C {
        constructor(t, s, i) {
          let r = [];
          for (let a = 0; a < i; a++) {
            r.push(0, 0, s / 2);
            let u = Math.cos(a * Math.PI / (i / 2)) * t, o = Math.sin(a * Math.PI / (i / 2)) * t, l = s / 2;
            r.push(u, o, l);
            let p = Math.cos((a + 1) * Math.PI / (i / 2)) * t, m = Math.sin((a + 1) * Math.PI / (i / 2)) * t, x = s / 2;
            r.push(p, m, x);
          }
          for (let a = 0; a < i; a++) {
            r.push(0, 0, -s / 2);
            let u = Math.cos(a * Math.PI / (i / 2)) * t, o = Math.sin(a * Math.PI / (i / 2)) * t, l = -s / 2;
            r.push(u, o, l);
            let p = Math.cos((a + 1) * Math.PI / (i / 2)) * t, m = Math.sin((a + 1) * Math.PI / (i / 2)) * t, x = -s / 2;
            r.push(p, m, x);
          }
          for (let a = 0; a < i; a++) {
            let u = Math.cos(a * Math.PI / (i / 2)) * t, o = Math.sin(a * Math.PI / (i / 2)) * t, l = s / 2;
            r.push(u, o, l);
            let p = Math.cos((a + 1) * Math.PI / (i / 2)) * t, m = Math.sin((a + 1) * Math.PI / (i / 2)) * t;
            r.push(p, m, l);
            let x = -s / 2;
            r.push(u, o, x), r.push(p, m, x), r.push(u, o, x), r.push(p, m, l);
          }
          super(r);
          let e = [];
          for (var h = 0; h < r.length; h += 3) {
            let a = r[h], u = r[h + 1], o = r[h + 2] > 0 ? 1 : -1, l = Math.sqrt(a ** 2 + u ** 2 + o ** 2);
            e.push(a / l, u / l, o / l);
          }
          this.attributes.aNormal.data = new Float32Array(e), this.attributes.aNormal.count = e.length / 3;
          let n = [];
          for (let a = 0; a < r.length; a += 3) {
            let u = (r[a] + t) / (t * 2), o = (r[a + 1] + t) / (t * 2);
            n.push(u, o);
          }
          this.setAttribute("aUV", new Float32Array(n), 2);
        }
      };
      var _t = 0;
      var at = class {
        constructor(t, s, i) {
          let r = this._createShader(t, t.VERTEX_SHADER, s), e = this._createShader(t, t.FRAGMENT_SHADER, i);
          this.gl = t, this.id = _t++, this.program = this._createProgram(t, r, e);
        }
        _createShader(t, s, i) {
          let r = t.createShader(s);
          if (t.shaderSource(r, i), t.compileShader(r), t.getShaderParameter(r, t.COMPILE_STATUS))
            return r;
          console.log(t.getShaderInfoLog(r)), t.deleteShader(r);
        }
        _createProgram(t, s, i) {
          let r = t.createProgram();
          if (t.attachShader(r, s), t.attachShader(r, i), t.linkProgram(r), t.getProgramParameter(r, t.LINK_STATUS))
            return r;
          console.log(t.getProgramInfoLog(r)), t.deleteProgram(r);
        }
      };
      var Mt = 0;
      var ct = class {
        constructor(t, s) {
          this.gl = t, this.texture = this.gl.createTexture(), this.id = Mt++, this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture), this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255])), this.image = new Image(), this.image.addEventListener("load", this.attachImage.bind(this)), this.image.src = s;
        }
        attachImage() {
          this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture), this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.image), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        }
      };
      var ut = class {
        constructor(t, s, i, r, e, h) {
          switch (this.gl = t, this.texture = this.gl.createTexture(), this.id = Mt++, this.width = i, this.height = r, this.data = e ? new Uint8Array(e) : null, s) {
            case "rgba":
              this.format = this.gl.RGBA;
              break;
            case "rgb":
              this.format = this.gl.RGB;
              break;
            case "luminance_alpha":
              this.format = this.gl.LUMINANCE_ALPHA;
              break;
            case "luminance":
              this.format = this.gl.LUMINANCE;
              break;
            default:
              this.format = this.gl.RGBA;
              break;
          }
          switch (h) {
            case "linear":
              this.filter = this.gl.LINEAR;
              break;
            case "nearest":
              this.filter = this.gl.NEAREST;
              break;
            default:
              this.filter = this.gl.NEAREST;
              break;
          }
          this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture), this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.format, i, r, 0, this.format, this.gl.UNSIGNED_BYTE, this.data), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.filter), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.filter);
        }
      };
      var ht = class {
        constructor(t, s) {
          this.type = t, this.type === "directional" ? this.direction = B.normalize([s[0], s[1], s[2]]) : this.type === "point" && (this.position = [s[0], s[1], s[2]]);
        }
        setDirection(t, s, i) {
          this.direction = B.normalize([t, s, i]);
        }
        setPosition(t, s, i) {
          this.position = [t, s, i];
        }
      };
      var nt = class {
        constructor(t, s) {
          this.gl = t, this.target = s, this.buffer = this.gl.createFramebuffer(), this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.buffer), this.depthBuffer = this.gl.createRenderbuffer(), this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer), this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, this.target.width, this.target.height), this.attachTexture(this.target), this.attachRenderBuffer();
        }
        resize(t, s) {
          this.gl.bindTexture(this.gl.TEXTURE_2D, this.target.texture), this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.target.format, t, s, 0, this.target.format, this.gl.UNSIGNED_BYTE, null), this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer), this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, t, s);
        }
        attachTexture(t) {
          this.target = t, this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.target.texture, 0);
        }
        attachRenderBuffer() {
          this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.depthBuffer);
        }
      };
      var lt = class {
        constructor(t, s, i) {
          this.gl = t, this.mouse = s, this.camera = i, this.color = new Uint8Array(4), this.selectedIndex = -1, this.objectCount = 0, this.viewport = { width: window.innerWidth, height: window.innerHeight, aspectRatio: window.innerWidth / window.innerHeight };
        }
        resize(t) {
          this.viewport.width = t.width, this.viewport.height = t.height, this.viewport.aspectRatio = t.width / t.height;
        }
        _getPixel() {
          this.pixel = { x: this.mouse.x * this.viewport.width / this.viewport.width, y: this.viewport.height - this.mouse.y * this.viewport.height / this.viewport.height - 1 };
        }
        _getColor() {
          this.gl.readPixels(0, 0, 1, 1, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.color);
        }
        getMatrix() {
          return this._getPixel(), this.camera.type === "perspective" ? (this.top = this.camera.near * Math.tan(this.camera.fieldOfView / 2), this.bottom = -this.top, this.right = this.top * this.camera.aspectRatio, this.left = -this.right) : this.camera.type === "orthographic" && (this.top = this.camera.top, this.bottom = this.camera.bottom, this.right = this.camera.right, this.left = this.camera.left), this.width = Math.abs(this.right - this.left), this.height = Math.abs(this.top - this.bottom), this.pixelLeft = this.left + this.pixel.x * this.width / this.viewport.width, this.pixelRight = this.pixelLeft + 1 / this.viewport.width, this.pixelTop = this.bottom + this.pixel.y * this.height / this.viewport.height, this.pixelBottom = this.pixelTop + 1 / this.viewport.height, this.near = this.camera.near, this.far = this.camera.far, this.camera.type === "perspective" ? this.matrix = [2 * this.near / (this.pixelRight - this.pixelLeft), 0, 0, 0, 0, 2 * this.near / (this.pixelTop - this.pixelBottom), 0, 0, (this.pixelRight + this.pixelLeft) / (this.pixelRight - this.pixelLeft), (this.pixelTop + this.pixelBottom) / (this.pixelTop - this.pixelBottom), -(this.far + this.near) / (this.far - this.near), -1, 0, 0, 2 * this.far * this.near / (this.near - this.far), 0] : this.camera.type === "orthographic" && (this.matrix = [2 / (this.pixelRight - this.pixelLeft), 0, 0, 0, 0, 2 / (this.pixelTop - this.pixelBottom), 0, 0, 0, 0, -2 / (this.far - this.near), 0, -((this.pixelRight + this.pixelLeft) / (this.pixelRight - this.pixelLeft)), -((this.pixelTop + this.pixelBottom) / (this.pixelTop - this.pixelBottom)), -((this.far + this.near) / (this.far - this.near)), 1]), this.matrix;
        }
        getObjectIndex() {
          return this._getColor(), this.selectedIndex = this.color[3] / 255 * this.objectCount - 1, this.selectedIndex;
        }
      };
      var E = class {
        static createColor(t, s, i) {
          return { r: t / 255, g: s / 255, b: i / 255 };
        }
      };
      E.Renderer = Z;
      E.Orthographic = W;
      E.Perspective = K;
      E.Volume = J;
      E.Collection = Q;
      E.Mesh = $;
      E.Geometry = C;
      E.Plane = tt;
      E.Circle = st;
      E.Tetrahedron = it;
      E.Cube = et;
      E.Sphere = rt;
      E.Cylinder = ot;
      E.Program = at;
      E.ImageTexture = ct;
      E.DataTexture = ut;
      E.Light = ht;
      E.FrameBuffer = nt;
      E.ColorPicker = lt;
    }
  });

  // src/js/demo/main.js
  var import_sandbox_min = __toModule(require_sandbox_min());

  // src/shaders/primitive/vertex.glsl
  var vertex_default = "attribute vec4 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aUV;\n\nuniform mat4 uViewProjectionMatrix;\nuniform mat4 uNormalMatrix;\nuniform mat4 uLocalMatrix;\n\nvarying vec3 vNormal;\nvarying vec2 vUV;\nvarying vec3 vPos;\n\nvoid main() {\n	vec4 position = uViewProjectionMatrix * uLocalMatrix * aPosition;\n	gl_Position = position;\n	vNormal = aNormal + 0.5;\n	vUV = aUV;\n	vPos = aPosition.xyz;\n}";

  // src/shaders/primitive/fragment.glsl
  var fragment_default = "precision mediump float;\n\nvarying vec3 vNormal;\nvarying vec2 vUV;\nvarying vec3 vPos;\n\nvoid main() {\n	float distance = 0.25 + (1.0 - 0.25) * (vPos.z - (-1.0)) / (1.0 - (-1.0));\n	vec3 green = vec3(0.420, 0.831, 0.565) * distance;\n\n	gl_FragColor = vec4(green, 1.0);\n}";

  // src/js/demo/main.js
  var now = 0;
  var time = 0;
  var then = 0;
  var planeCanvas = document.getElementById("primitive--plane");
  var planeRenderer = new import_sandbox_min.default.Renderer(planeCanvas);
  planeRenderer.resize();
  var planeVolume = new import_sandbox_min.default.Volume();
  var planeCamera = new import_sandbox_min.default.Perspective(35, 1, 0.1, 100);
  planeCamera.setPosition(0, 0, 6);
  var planeShader = new import_sandbox_min.default.Program(planeRenderer.gl, vertex_default, fragment_default);
  var planeGeometry = new import_sandbox_min.default.Plane(2, 2, 1, 1);
  var planeMesh = new import_sandbox_min.default.Mesh(planeGeometry, planeShader);
  planeVolume.add(planeMesh);
  var circleCanvas = document.getElementById("primitive--circle");
  var circleRenderer = new import_sandbox_min.default.Renderer(circleCanvas);
  circleRenderer.resize();
  var circleVolume = new import_sandbox_min.default.Volume();
  var circleCamera = new import_sandbox_min.default.Perspective(35, 1, 0.1, 100);
  circleCamera.setPosition(0, 0, 6);
  var circleShader = new import_sandbox_min.default.Program(circleRenderer.gl, vertex_default, fragment_default);
  var circleGeometry = new import_sandbox_min.default.Circle(1, 64);
  var circleMesh = new import_sandbox_min.default.Mesh(circleGeometry, circleShader);
  circleVolume.add(circleMesh);
  var tetrahedronCanvas = document.getElementById("primitive--tetrahedron");
  var tetrahedronRenderer = new import_sandbox_min.default.Renderer(tetrahedronCanvas);
  tetrahedronRenderer.resize();
  var tetrahedronVolume = new import_sandbox_min.default.Volume();
  var tetrahedronCamera = new import_sandbox_min.default.Perspective(35, 1, 0.1, 100);
  tetrahedronCamera.setPosition(0, 0, 6);
  var tetrahedronShader = new import_sandbox_min.default.Program(tetrahedronRenderer.gl, vertex_default, fragment_default);
  var tetrahedronGeometry = new import_sandbox_min.default.Tetrahedron(2);
  var tetrahedronMesh = new import_sandbox_min.default.Mesh(tetrahedronGeometry, tetrahedronShader);
  tetrahedronVolume.add(tetrahedronMesh);
  var cubeCanvas = document.getElementById("primitive--cube");
  var cubeRenderer = new import_sandbox_min.default.Renderer(cubeCanvas);
  cubeRenderer.resize();
  var cubeVolume = new import_sandbox_min.default.Volume();
  var cubeCamera = new import_sandbox_min.default.Perspective(35, 1, 0.1, 100);
  cubeCamera.setPosition(0, 0, 6);
  var cubeShader = new import_sandbox_min.default.Program(cubeRenderer.gl, vertex_default, fragment_default);
  var cubeGeometry = new import_sandbox_min.default.Cube(2, 2, 2, 1, 1, 1);
  var cubeMesh = new import_sandbox_min.default.Mesh(cubeGeometry, cubeShader);
  cubeVolume.add(cubeMesh);
  var sphereCanvas = document.getElementById("primitive--sphere");
  var sphereRenderer = new import_sandbox_min.default.Renderer(sphereCanvas);
  sphereRenderer.resize();
  var sphereVolume = new import_sandbox_min.default.Volume();
  var sphereCamera = new import_sandbox_min.default.Perspective(35, 1, 0.1, 100);
  sphereCamera.setPosition(0, 0, 6);
  var sphereShader = new import_sandbox_min.default.Program(sphereRenderer.gl, vertex_default, fragment_default);
  var sphereGeometry = new import_sandbox_min.default.Sphere(1, 64);
  var sphereMesh = new import_sandbox_min.default.Mesh(sphereGeometry, sphereShader);
  sphereVolume.add(sphereMesh);
  var cylinderCanvas = document.getElementById("primitive--cylinder");
  var cylinderRenderer = new import_sandbox_min.default.Renderer(cylinderCanvas);
  cylinderRenderer.resize();
  var cylinderVolume = new import_sandbox_min.default.Volume();
  var cylinderCamera = new import_sandbox_min.default.Perspective(35, 1, 0.1, 100);
  cylinderCamera.setPosition(0, 0, 6);
  var cylinderShader = new import_sandbox_min.default.Program(cylinderRenderer.gl, vertex_default, fragment_default);
  var cylinderGeometry = new import_sandbox_min.default.Cylinder(1, 2, 64);
  var cylinderMesh = new import_sandbox_min.default.Mesh(cylinderGeometry, cylinderShader);
  cylinderVolume.add(cylinderMesh);
  var perspectiveCanvas = document.getElementById("perspective");
  var perspectiveRenderer = new import_sandbox_min.default.Renderer(perspectiveCanvas);
  perspectiveRenderer.resize();
  var perspectiveVolume = new import_sandbox_min.default.Volume();
  var perspectiveCamera = new import_sandbox_min.default.Perspective(35, 1.85, 0.1, 100);
  perspectiveCamera.setPosition(0, 0, 6);
  var perspectiveShader = new import_sandbox_min.default.Program(perspectiveRenderer.gl, vertex_default, fragment_default);
  var perspectiveGeometry = new import_sandbox_min.default.Cube(2, 2, 2, 1, 1, 1);
  var perspectiveMesh = new import_sandbox_min.default.Mesh(perspectiveGeometry, perspectiveShader);
  perspectiveVolume.add(perspectiveMesh);
  var perspectiveFOV = document.getElementById("perspective-fov");
  perspectiveFOV.addEventListener("input", (event) => {
    perspectiveCamera.setFieldOfView(event.target.value);
  });
  var perspectiveAspect = document.getElementById("perspective-aspect");
  perspectiveAspect.addEventListener("input", (event) => {
    perspectiveCamera.setAspectRatio(event.target.value);
  });
  var perspectiveNear = document.getElementById("perspective-near");
  perspectiveNear.addEventListener("input", (event) => {
    perspectiveCamera.setNear(parseFloat(event.target.value));
  });
  var perspectiveFar = document.getElementById("perspective-far");
  perspectiveFar.addEventListener("input", (event) => {
    perspectiveCamera.setFar(parseFloat(event.target.value));
  });
  var orthographicCanvas = document.getElementById("orthographic");
  var orthographicRenderer = new import_sandbox_min.default.Renderer(orthographicCanvas);
  orthographicRenderer.resize();
  var orthographicVolume = new import_sandbox_min.default.Volume();
  var orthographicCamera = new import_sandbox_min.default.Orthographic(-4.43359375, 4.43359375, -2, 2, -2, 2);
  var orthographicShader = new import_sandbox_min.default.Program(orthographicRenderer.gl, vertex_default, fragment_default);
  var orthographicGeometry = new import_sandbox_min.default.Cube(2, 2, 2, 1, 1, 1);
  var orthographicMesh = new import_sandbox_min.default.Mesh(orthographicGeometry, orthographicShader);
  orthographicVolume.add(orthographicMesh);
  var orthographicLeft = document.getElementById("orthographic-left");
  orthographicLeft.addEventListener("input", (event) => {
    orthographicCamera.setLeft(parseFloat(event.target.value));
  });
  var orthographicRight = document.getElementById("orthographic-right");
  orthographicRight.addEventListener("input", (event) => {
    orthographicCamera.setRight(parseFloat(event.target.value));
  });
  var orthographicBottom = document.getElementById("orthographic-bottom");
  orthographicBottom.addEventListener("input", (event) => {
    orthographicCamera.setBottom(parseFloat(event.target.value));
  });
  var orthographicTop = document.getElementById("orthographic-top");
  orthographicTop.addEventListener("input", (event) => {
    orthographicCamera.setTop(parseFloat(event.target.value));
  });
  var orthographicNear = document.getElementById("orthographic-near");
  orthographicNear.addEventListener("input", (event) => {
    orthographicCamera.setNear(parseFloat(event.target.value));
  });
  var orthographicFar = document.getElementById("orthographic-far");
  orthographicFar.addEventListener("input", (event) => {
    orthographicCamera.setFar(parseFloat(event.target.value));
  });
  var update = (current) => {
    now = current;
    time += now - then;
    then = now;
    planeMesh.setRotationX(Math.sin(time / 1e3) * 30);
    planeMesh.setRotationY(Math.cos(time / 1200) * 30);
    planeRenderer.gl.clearColor(0, 0, 0, 0);
    planeRenderer.render(planeVolume, planeCamera);
    circleMesh.setRotationX(Math.sin(time / 1e3) * 30);
    circleMesh.setRotationY(Math.cos(time / 1200) * 30);
    circleRenderer.gl.clearColor(0, 0, 0, 0);
    circleRenderer.render(circleVolume, circleCamera);
    tetrahedronMesh.setRotationX(Math.sin(time / 1e3) * 30);
    tetrahedronMesh.setRotationY(Math.cos(time / 1200) * 30);
    tetrahedronRenderer.gl.clearColor(0, 0, 0, 0);
    tetrahedronRenderer.render(tetrahedronVolume, tetrahedronCamera);
    cubeMesh.setRotationX(Math.sin(time / 1e3) * 30);
    cubeMesh.setRotationY(Math.cos(time / 1200) * 30);
    cubeRenderer.gl.clearColor(0, 0, 0, 0);
    cubeRenderer.render(cubeVolume, cubeCamera);
    sphereMesh.setRotationX(Math.sin(time / 1e3) * 30);
    sphereMesh.setRotationY(Math.cos(time / 1200) * 30);
    sphereRenderer.gl.clearColor(0, 0, 0, 0);
    sphereRenderer.render(sphereVolume, sphereCamera);
    cylinderMesh.setRotationX(Math.sin(time / 1e3) * 30);
    cylinderMesh.setRotationY(Math.cos(time / 1200) * 30);
    cylinderRenderer.gl.clearColor(0, 0, 0, 0);
    cylinderRenderer.render(cylinderVolume, cylinderCamera);
    perspectiveMesh.setRotationX(Math.sin(time / 1e3) * 30);
    perspectiveMesh.setRotationY(Math.cos(time / 1200) * 30);
    perspectiveRenderer.gl.clearColor(1, 1, 1, 1);
    perspectiveRenderer.render(perspectiveVolume, perspectiveCamera);
    orthographicMesh.setRotationX(Math.sin(time / 1e3) * 30);
    orthographicMesh.setRotationY(Math.cos(time / 1200) * 30);
    orthographicRenderer.gl.clearColor(1, 1, 1, 1);
    orthographicRenderer.render(orthographicVolume, orthographicCamera);
    window.requestAnimationFrame(update);
  };
  window.requestAnimationFrame(update);
})();
