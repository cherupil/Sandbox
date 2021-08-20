(()=>{var U=`attribute vec4 aPosition;
attribute vec3 aColor;

uniform mat3 uMatrix;

varying vec3 vColor;

void main() {
	vec2 position = (uMatrix * vec3(aPosition.xy, 1.0)).xy;
	gl_Position = vec4(position, 0.0, 1.0);

	vColor = aColor;
}`;var V=`precision mediump float;

varying vec3 vColor;

void main() {
	gl_FragColor = vec4(vColor, 1.0);
}`;var H=`attribute vec4 aPosition;

uniform mat3 uMatrix;

varying vec4 vPos;

void main() {
	vec2 position = (uMatrix * vec3(aPosition.xy, 1.0)).xy;
	gl_Position = vec4(position, 0.0, 1.0);
	vPos = aPosition;
}`;var k=`precision mediump float;

uniform vec2 uResolution;

varying vec4 vPos;

void main() {
	vec2 fragmentPos = gl_FragCoord.xy / uResolution;
	gl_FragColor = vec4(fragmentPos.x, fragmentPos.y, 0.0, 1.0);
}`;var R=class{constructor(t){this.gl=t.getContext("webgl",{powerPreference:"high-performance"}),this.resize=this.resize.bind(this),this.render=this.render.bind(this)}resize(){let t=this.gl.canvas.clientWidth,r=this.gl.canvas.clientHeight;(this.gl.canvas.width!==t||this.gl.canvas.height!==r)&&(this.gl.canvas.width=t,this.gl.canvas.height=r,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height))}render(t){let r=null,s=null;for(let e of t.objects){let i=!1;if(e.shader.program!==r&&(this.gl.useProgram(e.shader.program),r=e.shader.program,i=!0),i||e.geometry.attributes!=s){for(let o in e.geometry.attributes){this.gl.enableVertexAttribArray(e.geometry.attributes[o].location),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e.geometry.attributes[o].buffer);let u=e.geometry.attributes[o].size,g=this.gl.FLOAT,n=!1,d=0,p=0;this.gl.vertexAttribPointer(e.geometry.attributes[o].location,u,g,n,d,p)}s=e.geometry.attributes}for(let o in e.shader.uniforms)if(o==="uMatrix")this.gl.uniformMatrix3fv(e.shader.uniforms[o].location,!1,e.matrix);else switch(e.shader.uniforms[o].type){case"1f":this.gl.uniform1f(e.shader.uniforms[o].location,e.shader.uniforms[o].value);break;case"2f":this.gl.uniform2f(e.shader.uniforms[o].location,e.shader.uniforms[o].value[0],e.shader.uniforms[o].value[1]);break;case"3f":this.gl.uniform2f(e.shader.uniforms[o].location,e.shader.uniforms[o].value[0],e.shader.uniforms[o].value[1],e.shader.uniforms[o].value[2]);break;case"mat3":this.gl.uniformMatrix3fv(e.shader.uniforms[o].location,!1,e.shader.uniforms[o].value);break;default:break}let l=this.gl[e.drawMode],h=0,m=e.geometry.attributes.aPosition.count;this.gl.drawArrays(l,h,m)}}};var S=class{constructor(){this.objects=[]}add(t){this.objects.push(t),this.objects.sort((r,s)=>{let e=r.geometry.id-s.geometry.id;return e||r.shader.id-s.shader.id})}};var c=class{static multiply3x3(t,r){let s=t[0*3+0],e=t[0*3+1],i=t[0*3+2],l=t[1*3+0],h=t[1*3+1],m=t[1*3+2],o=t[2*3+0],u=t[2*3+1],g=t[2*3+2],n=r[0*3+0],d=r[0*3+1],p=r[0*3+2],b=r[1*3+0],v=r[1*3+1],M=r[1*3+2],P=r[2*3+0],w=r[2*3+1],A=r[2*3+2];return[n*s+d*l+p*o,n*e+d*h+p*u,n*i+d*m+p*g,b*s+v*l+M*o,b*e+v*h+M*u,b*i+v*m+M*g,P*s+w*l+A*o,P*e+w*h+A*u,P*i+w*m+A*g]}static identity2D(){return[1,0,0,0,1,0,0,0,1]}static translate2D(t,r){return[1,0,0,0,1,0,t,r,1]}static rotate2D(t){let r=t*Math.PI/180,s=Math.cos(r),e=Math.sin(r);return[s,-e,0,e,s,0,0,0,1]}static scale2D(t,r){return[t,0,0,0,r,0,0,0,1]}};var D=class{constructor(t,r){this.geometry=t,this.shader=r,this.position={x:0,y:0},this.rotation=0,this.scale={x:1,y:1},this.matrix=c.identity2D(),this._setAttributeData(),this._setUniformData(),this._setDrawMode()}_setAttributeData(){for(let t in this.geometry.attributes)this.geometry.attributes[t].location=this.shader.gl.getAttribLocation(this.shader.program,this.geometry.attributes[t].name),this.geometry.attributes[t].buffer=this.shader.gl.createBuffer(),this.shader.gl.bindBuffer(this.shader.gl.ARRAY_BUFFER,this.geometry.attributes[t].buffer),this.shader.gl.bufferData(this.shader.gl.ARRAY_BUFFER,this.geometry.attributes[t].data,this.shader.gl.STATIC_DRAW)}_setUniformData(){if(this.shader.uniforms)for(let t in this.shader.uniforms)this.shader.uniforms[t].location=this.shader.gl.getUniformLocation(this.shader.program,this.shader.uniforms[t].name)}_setDrawMode(){this.drawMode=this.geometry.type??"TRIANGLES"}_recalculateModelMatrix(){let t=c.identity2D(),r=c.translate2D(this.position.x,this.position.y),s=c.rotate2D(this.rotation),e=c.scale2D(this.scale.x,this.scale.y),i=c.multiply3x3(t,r);i=c.multiply3x3(i,s),i=c.multiply3x3(i,e),this.matrix=i}setPosition2D(t,r){this.position={x:t,y:r},this._recalculateModelMatrix()}setRotation2D(t){this.rotation=t,this._recalculateModelMatrix()}setScale2D(t,r){this.scale={x:t,y:r},this._recalculateModelMatrix()}};var $=0,y=class{constructor(t){this.id=$++,this.attributes={},this.setAttribute("aPosition",new Float32Array(t),3)}setAttribute(t,r,s){this.attributes[t]={name:t,data:r,size:s,count:r.length/s}}};var C=class extends y{constructor(t,r,s,e){let i=[],l=t/s,h=r/e;for(let m=0;m<e;m++)for(let o=0;o<s;o++){let u=o*l-t/2,g=m*h-r/2,n=0,d=(o+1)*l-t/2,p=g,b=u,v=(m+1)*h-r/2,M=u,P=v,w=d,A=p,Y=d,K=v;i.push(u,g,n,d,p,n,b,v,n,M,P,n,w,A,n,Y,K,n)}super(i)}};var F=class extends y{constructor(t,r){let s=[];s.push(0,0,0);for(let e=0;e<r;e++){let i=Math.cos(e*Math.PI/(r/2))*t,l=Math.sin(e*Math.PI/(r/2))*t,h=0;s.push(i,l,h)}s.push(Math.cos(0)*t,Math.sin(0)*t,0);super(s);this.type="TRIANGLE_FAN"}};var tt=0,j=class{constructor(t,r,s){let e=this._createShader(t,t.VERTEX_SHADER,r),i=this._createShader(t,t.FRAGMENT_SHADER,s);this.gl=t,this.id=tt++,this.program=this._createProgram(t,e,i),this.uniforms={uMatrix:{name:"uMatrix",value:null,type:"mat3"}}}_createShader(t,r,s){let e=t.createShader(r);if(t.shaderSource(e,s),t.compileShader(e),t.getShaderParameter(e,t.COMPILE_STATUS))return e;console.log(t.getShaderInfoLog(e)),t.deleteShader(e)}_createProgram(t,r,s){let e=t.createProgram();if(t.attachShader(e,r),t.attachShader(e,s),t.linkProgram(e),t.getProgramParameter(e,t.LINK_STATUS))return e;console.log(t.getProgramInfoLog(e)),t.deleteProgram(e)}setUniform(t,r,s){this.uniforms[t]={name:t,value:r,type:s}}};var a=class{static createColor(t,r,s){return{r:t/255,g:r/255,b:s/255}}};a.Renderer=R;a.Volume=S;a.Mesh=D;a.Geometry=y;a.Plane=C;a.Circle=F;a.Program=j;var W=window.innerWidth/window.innerHeight,I=document.getElementById("webgl"),x=new a.Renderer(I),T=1,z=T*Math.sqrt(3)/2,N=new a.Geometry([-(T/2)/W,-z/2,0,T/2/W,-z/2,0,0,z/2,0]);N.setAttribute("aColor",new Float32Array([0,0,1,0,0,1,0,0,1]),3);var et=new a.Program(x.gl,U,V),O=new a.Mesh(N,et),E=new a.Volume;E.add(O);var rt=new a.Plane(.625,.625,1,1),B=new a.Program(x.gl,H,k);B.setUniform("uResolution",[I.clientWidth,I.clientHeight],"2f");var G=new a.Mesh(rt,B);G.setPosition2D(-.5,.5);E.add(G);var st=new a.Circle(.375,64),L=new a.Mesh(st,B);L.setPosition2D(.5,0);E.add(L);x.resize();x.gl.clearColor(0,0,0,0);x.gl.clear(x.gl.COLOR_BUFFER_BIT);var _=0,q=()=>{x.render(E),_+=.01,O.setScale2D((Math.sin(_)+1)/2,(Math.sin(_)+1)/2),G.setRotation2D(_*100),L.setPosition2D(.5,Math.cos(_)*.5),window.requestAnimationFrame(q)};window.addEventListener("resize",x.resize);window.requestAnimationFrame(q);})();
