(()=>{var F=`// an attribute will receive data from a buffer
attribute vec4 aPosition;
attribute vec3 aColor;

varying vec3 vColor;

// all shaders have a main function
void main() {

	// gl_Position is a special variable a vertex shader
	// is responsible for setting
	gl_Position = aPosition;

	vColor = aColor;
}`;var C=`// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default
precision mediump float;

varying vec3 vColor;

void main() {
	// gl_FragColor is a special variable a fragment shader
	// is responsible for setting
	gl_FragColor = vec4(vColor, 1.0); // return reddish-purple
}`;var E=`// an attribute will receive data from a buffer
attribute vec4 aPosition;

// all shaders have a main function
void main() {

	// gl_Position is a special variable a vertex shader
	// is responsible for setting
	gl_Position = aPosition;
}`;var j=`// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default
precision mediump float;

void main() {
	// gl_FragColor is a special variable a fragment shader
	// is responsible for setting
	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // return reddish-purple
}`;var p=class{constructor(e){this.gl=e.getContext("webgl",{powerPreference:"high-performance"}),this.resize=this.resize.bind(this),this.render=this.render.bind(this)}resize(){let e=this.gl.canvas.clientWidth,t=this.gl.canvas.clientHeight;(this.gl.canvas.width!==e||this.gl.canvas.height!==t)&&(this.gl.canvas.width=e,this.gl.canvas.height=t,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height))}render(e){for(let t of e.objects){this.gl.useProgram(t.shader);for(let n in t.geometry.attributes){this.gl.enableVertexAttribArray(t.geometry.attributes[n].location),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,t.geometry.attributes[n].buffer);let u=t.geometry.attributes[n].size,l=this.gl.FLOAT,h=!1,m=0,f=0;this.gl.vertexAttribPointer(t.geometry.attributes[n].location,u,l,h,m,f)}let s=this.gl.TRIANGLES,r=0,i=t.geometry.attributes.aPosition.count;this.gl.drawArrays(s,r,i)}}};var b=class{constructor(){this.objects=[]}add(e){this.objects.push(e)}};var v=class{constructor(e,t,s){this.gl=e,this.geometry=t,this.shader=s,this._setAttributeData()}_setAttributeData(){for(let e in this.geometry.attributes)this.geometry.attributes[e].location=this.gl.getAttribLocation(this.shader,this.geometry.attributes[e].name),this.geometry.attributes[e].buffer=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.geometry.attributes[e].buffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,this.geometry.attributes[e].data,this.gl.STATIC_DRAW)}};var g=class{constructor(e){this.attributes={},this.setAttribute("aPosition",new Float32Array(e),3)}setAttribute(e,t,s){this.attributes[e]={name:e,data:t,size:s,count:t.length/s}}};var y=class extends g{constructor(e,t,s,r){let i=[],n=e/s,u=t/r;for(let l=0;l<r;l++)for(let h=0;h<s;h++){let m=h*n-e/2,f=l*u-t/2,d=0,A=(h+1)*n-e/2,R=f,G=m,w=(l+1)*u-t/2,I=m,V=w,D=A,H=R,U=A,O=w;i.push(m,f,d,A,R,d,G,w,d,I,V,d,D,H,d,U,O,d)}super(i)}};var S=class{static create(e,t,s){let r=this._createShader(e,e.VERTEX_SHADER,t),i=this._createShader(e,e.FRAGMENT_SHADER,s);return this._createProgram(e,r,i)}static _createShader(e,t,s){let r=e.createShader(t);if(e.shaderSource(r,s),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS))return r;console.log(e.getShaderInfoLog(r)),e.deleteShader(r)}static _createProgram(e,t,s){let r=e.createProgram();if(e.attachShader(r,t),e.attachShader(r,s),e.linkProgram(r),e.getProgramParameter(r,e.LINK_STATUS))return r;console.log(e.getProgramInfoLog(r)),e.deleteProgram(r)}};var o=class{static createColor(e,t,s){return{r:e/255,g:t/255,b:s/255}}};o.Renderer=p;o.Volume=b;o.Mesh=v;o.Geometry=g;o.Plane=y;o.Shader=S;var T=window.innerWidth/window.innerHeight,Y=document.getElementById("webgl"),a=new o.Renderer(Y),x=1,P=x*Math.sqrt(3)/2,z=new o.Geometry([-(x/2)/T,-P/2,0,x/2/T,-P/2,0,0,P/2,0]);z.setAttribute("aColor",new Float32Array([1,0,0,0,1,0,0,0,1]),3);var M=o.Shader.create(a.gl,F,C),K=new o.Mesh(a.gl,z,M),_=new o.Volume;_.add(K);var B=new o.Plane(.5,.5,1,1);B.setAttribute("aColor",new Float32Array([0,0,0,1,0,0,0,1,0,0,1,0,1,0,0,1,1,0]),3);var ye=o.Shader.create(a.gl,E,j),X=new o.Mesh(a.gl,B,M);_.add(X);a.resize();a.gl.clearColor(0,0,0,0);a.gl.clear(a.gl.COLOR_BUFFER_BIT);var L=()=>{a.render(_),window.requestAnimationFrame(L)};window.addEventListener("resize",a.resize);window.requestAnimationFrame(L);})();
