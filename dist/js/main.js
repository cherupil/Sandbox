(()=>{var ot=`attribute vec4 aPosition;

uniform mat4 uMatrix;
uniform float uTime;

void main() {
	vec4 position = uMatrix * aPosition;
	float zToDivideBy = 1.0 + position.z * 0.0;
	position.x += sin(position.y * 24.0 + (uTime * 1.0)) / 160.0;
	position.y += sin(position.z * 40.0 + (uTime * 1.1)) / 160.0;
	position.z += sin(position.x * 32.0 + (uTime * 1.2)) / 160.0;
	gl_Position = vec4(position.xy / zToDivideBy, position.zw);
}`;var it=`precision mediump float;

uniform vec2 uResolution;
uniform float uRed;
uniform float uGreen;
uniform float uBlue;

void main() {
	vec3 outer = vec3(uRed/2.0, uGreen/4.0, uBlue/4.0);
	vec3 inner = vec3(uRed/8.0, uGreen/16.0, uBlue/16.0);
	vec2 center = vec2(0.5);
	vec2 st = gl_FragCoord.xy/uResolution.xy;
	float dist = distance(st, center) * 8.0;
	vec3 mixed = mix(outer, inner, dist);
	gl_FragColor = vec4(mixed, 1.0);
}`;var rt=`attribute vec4 aPosition;

uniform mat4 uMatrix;
uniform float uTime;

void main() {
	vec4 position = uMatrix * aPosition;
	float zToDivideBy = 1.0 + position.z * 0.0;
	position.x += sin(position.y * 24.0 + (uTime * 1.0)) / 160.0;
	position.y += sin(position.z * 40.0 + (uTime * 1.1)) / 160.0;
	position.z += sin(position.x * 32.0 + (uTime * 1.2)) / 160.0;
	gl_Position = vec4(position.xy / zToDivideBy, position.zw);
}`;var at=`precision mediump float;

uniform float uRed;
uniform float uGreen;
uniform float uBlue;

void main() {
	float sideLength = 0.25;
	float diagonal = sqrt(pow(sideLength, 2.0) + pow(sideLength, 2.0));
	float total = sqrt(pow(diagonal, 2.0) + pow(diagonal, 2.0));
	float diff = ((total / 2.0) + gl_FragCoord.z) / total;
	vec3 front = vec3((1.0 + uRed) - diff, (1.0 + uGreen) - diff, (1.0 + uBlue) - diff);
	vec3 back = vec3(0.0, 0.0, 0.0);
	vec3 final = mix(back, front, 2.25 - diff);
	vec3 depth = vec3(pow(1.0 - diff, 8.0));
	gl_FragColor = vec4(final + depth, 1.0);
}`;var N=class{constructor(t){this.gl=t.getContext("webgl",{powerPreference:"high-performance"}),this.resize=this.resize.bind(this),this.render=this.render.bind(this),this.pixelRatio=2}setPixelRatio(t){this.pixelRatio=t}resize(){let t=this.gl.canvas.clientWidth*this.pixelRatio,e=this.gl.canvas.clientHeight*this.pixelRatio;return this.gl.canvas.width*this.pixel!==t||this.gl.canvas.height*this.pixelRatio!==e?(this.gl.canvas.width=t,this.gl.canvas.height=e,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),!0):!1}render(t,e){this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this.gl.enable(this.gl.CULL_FACE),this.gl.enable(this.gl.DEPTH_TEST);let o=null,i=null;for(let r of t.objects){r.setProjectionMatrix(e.matrix);let u=!1;if(r.shader.program!==o&&(this.gl.useProgram(r.shader.program),o=r.shader.program,u=!0),u||r.geometry.attributes!=i){for(let a in r.geometry.attributes){this.gl.enableVertexAttribArray(r.geometry.attributes[a].location),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,r.geometry.attributes[a].buffer);let f=r.geometry.attributes[a].size,d=this.gl.FLOAT,x=!1,v=0,b=0;this.gl.vertexAttribPointer(r.geometry.attributes[a].location,f,d,x,v,b)}i=r.geometry.attributes}for(let a in r.shader.uniforms)if(a==="uMatrix")this.gl.uniformMatrix4fv(r.shader.uniforms[a].location,!1,r.projectionMatrix);else switch(r.shader.uniforms[a].type){case"1f":this.gl.uniform1f(r.shader.uniforms[a].location,r.shader.uniforms[a].value);break;case"2f":this.gl.uniform2f(r.shader.uniforms[a].location,r.shader.uniforms[a].value[0],r.shader.uniforms[a].value[1]);break;case"3f":this.gl.uniform2f(r.shader.uniforms[a].location,r.shader.uniforms[a].value[0],r.shader.uniforms[a].value[1],r.shader.uniforms[a].value[2]);break;case"mat3":this.gl.uniformMatrix3fv(r.shader.uniforms[a].location,!1,r.shader.uniforms[a].value);break;case"mat4":this.gl.uniformMatrix4fv(r.shader.uniforms[a].location,!1,r.shader.uniforms[a].value);break;default:break}let c=this.gl[r.drawMode],m=0,h=r.geometry.attributes.aPosition.count;this.gl.drawArrays(c,m,h)}}};var q=class{constructor(t,e,o,i,r,u){this.left=t,this.right=e,this.bottom=o,this.top=i,this.near=r,this.far=u,this._createMatrix()}_createMatrix(){this.matrix=[2/(this.right-this.left),0,0,0,0,2/(this.top-this.bottom),0,0,0,0,-2/(this.far-this.near),0,-(this.right+this.left)/(this.right-this.left),-(this.top+this.bottom)/(this.top-this.bottom),-(this.far+this.near)/(this.far-this.near),1]}setLeft(t){this.left=t,this._createMatrix()}setRight(t){this.right=t,this._createMatrix()}setBottom(t){this.bottom=t,this._createMatrix()}setTop(t){this.top=t,this._createMatrix()}setNear(t){this.near=t,this._createMatrix()}setFar(t){this.far=t,this._createMatrix()}};var W=class{constructor(){this.objects=[]}add(t){this.objects.push(t),this.objects.sort((e,o)=>{let i=e.geometry.id-o.geometry.id;return i||e.shader.id-o.shader.id})}};var p=class{static multiply(t,e){let o=e[0*4+0],i=e[0*4+1],r=e[0*4+2],u=e[0*4+3],c=e[1*4+0],m=e[1*4+1],h=e[1*4+2],a=e[1*4+3],f=e[2*4+0],d=e[2*4+1],x=e[2*4+2],v=e[2*4+3],b=e[3*4+0],M=e[3*4+1],w=e[3*4+2],T=e[3*4+3],A=t[0*4+0],y=t[0*4+1],R=t[0*4+2],_=t[0*4+3],s=t[1*4+0],B=t[1*4+1],E=t[1*4+2],F=t[1*4+3],j=t[2*4+0],D=t[2*4+1],k=t[2*4+2],Y=t[2*4+3],X=t[3*4+0],O=t[3*4+1],H=t[3*4+2],V=t[3*4+3];return[o*A+i*s+r*j+u*X,o*y+i*B+r*D+u*O,o*R+i*E+r*k+u*H,o*_+i*F+r*Y+u*V,c*A+m*s+h*j+a*X,c*y+m*B+h*D+a*O,c*R+m*E+h*k+a*H,c*_+m*F+h*Y+a*V,f*A+d*s+x*j+v*X,f*y+d*B+x*D+v*O,f*R+d*E+x*k+v*H,f*_+d*F+x*Y+v*V,b*A+M*s+w*j+T*X,b*y+M*B+w*D+T*O,b*R+M*E+w*k+T*H,b*_+M*F+w*Y+T*V]}static identity(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}static translate(t,e,o){return[1,0,0,0,0,1,0,0,0,0,1,0,t,e,o,1]}static rotateX(t){let e=t*Math.PI/180,o=Math.cos(e),i=Math.sin(e);return[1,0,0,0,0,o,i,0,0,-i,o,0,0,0,0,1]}static rotateY(t){let e=t*Math.PI/180,o=Math.cos(e),i=Math.sin(e);return[o,0,-i,0,0,1,0,0,i,0,o,0,0,0,0,1]}static rotateZ(t){let e=t*Math.PI/180,o=Math.cos(e),i=Math.sin(e);return[o,i,0,0,-i,o,0,0,0,0,1,0,0,0,0,1]}static scale(t,e,o){return[t,0,0,0,0,e,0,0,0,0,o,0,0,0,0,1]}};var Z=class{constructor(t,e){this.geometry=t,this.shader=e,this.position={x:0,y:0,z:0},this.rotation={x:0,y:0,z:0},this.scale={x:1,y:1,z:1},this.localMatrix=p.identity(),this._setAttributeData(),this._setUniformData(),this._setDrawMode()}_setAttributeData(){for(let t in this.geometry.attributes)this.geometry.attributes[t].location=this.shader.gl.getAttribLocation(this.shader.program,this.geometry.attributes[t].name),this.geometry.attributes[t].buffer=this.shader.gl.createBuffer(),this.shader.gl.bindBuffer(this.shader.gl.ARRAY_BUFFER,this.geometry.attributes[t].buffer),this.shader.gl.bufferData(this.shader.gl.ARRAY_BUFFER,this.geometry.attributes[t].data,this.shader.gl.STATIC_DRAW)}_setUniformData(){if(this.shader.uniforms)for(let t in this.shader.uniforms)this.shader.uniforms[t].location=this.shader.gl.getUniformLocation(this.shader.program,this.shader.uniforms[t].name)}_setDrawMode(){this.drawMode=this.geometry.type??"TRIANGLES"}_recalculateModelMatrix(){let t=p.identity(),e=p.translate(this.position.x,this.position.y,this.position.z),o=p.rotateX(this.rotation.x),i=p.rotateY(this.rotation.y),r=p.rotateZ(this.rotation.z),u=p.scale(this.scale.x,this.scale.y,this.scale.z),c=p.multiply(t,e);c=p.multiply(c,o),c=p.multiply(c,i),c=p.multiply(c,r),c=p.multiply(c,u),this.localMatrix=c}setProjectionMatrix(t){this.projectionMatrix=p.multiply(t,this.localMatrix)}setPosition(t,e,o){this.position={x:t,y:e,z:o},this._recalculateModelMatrix()}setRotationX(t){this.rotation.x=t,this._recalculateModelMatrix()}setRotationY(t){this.rotation.y=t,this._recalculateModelMatrix()}setRotationZ(t){this.rotation.z=t,this._recalculateModelMatrix()}setScale(t,e,o){this.scale={x:t,y:e,z:o},this._recalculateModelMatrix()}};var mt=0,z=class{constructor(t){this.id=mt++,this.attributes={},this.setAttribute("aPosition",new Float32Array(t),3)}setAttribute(t,e,o){this.attributes[t]={name:t,data:e,size:o,count:e.length/o}}};var $=class extends z{constructor(t,e,o,i){let r=[],u=t/o,c=e/i;for(let m=0;m<i;m++)for(let h=0;h<o;h++){let a=h*u-t/2,f=m*c-e/2,d=0,x=(h+1)*u-t/2,v=f,b=a,M=(m+1)*c-e/2,w=a,T=M,A=x,y=v,R=x,_=M;r.push(a,f,d,x,v,d,b,M,d,w,T,d,A,y,d,R,_,d)}super(r)}};var K=class extends z{constructor(t,e){let o=[];o.push(0,0,0);for(let i=0;i<e;i++){let r=Math.cos(i*Math.PI/(e/2))*t,u=Math.sin(i*Math.PI/(e/2))*t,c=0;o.push(r,u,c)}o.push(Math.cos(0)*t,Math.sin(0)*t,0);super(o);this.type="TRIANGLE_FAN"}};var J=class extends z{constructor(t,e,o,i,r,u){let c=[];m("x","y","z",t,e,o,i,r,"front"),m("x","y","z",t,e,-o,i,r,"back"),m("x","z","y",t,o,e,i,u,"back"),m("x","z","y",t,o,-e,i,u,"front"),m("z","y","x",o,e,t,u,r,"back"),m("z","y","x",o,e,-t,u,r,"front");function m(h,a,f,d,x,v,b,M,w){let T=d/b,A=x/M,y=v/2;for(let R=0;R<M;R++)for(let _=0;_<b;_++){let s={};s[h]=[],s[a]=[],s[f]=[];let B=_*T-d/2,E=R*A-x/2,F=(_+1)*T-d/2,j=(R+1)*A-x/2;s[h].push(B),s[a].push(E),s[f].push(y),s[h].push(F),s[a].push(E),s[f].push(y),s[h].push(B),s[a].push(j),s[f].push(y),s[h].push(B),s[a].push(j),s[f].push(y),s[h].push(F),s[a].push(E),s[f].push(y),s[h].push(F),s[a].push(j),s[f].push(y),w==="front"?c.push(s.x[0],s.y[0],s.z[0],s.x[1],s.y[1],s.z[1],s.x[2],s.y[2],s.z[2],s.x[3],s.y[3],s.z[3],s.x[4],s.y[4],s.z[4],s.x[5],s.y[5],s.z[5]):w==="back"&&c.push(s.x[0],s.y[0],s.z[0],s.x[2],s.y[2],s.z[2],s.x[1],s.y[1],s.z[1],s.x[3],s.y[3],s.z[3],s.x[5],s.y[5],s.z[5],s.x[4],s.y[4],s.z[4])}}super(c)}};var ft=0,Q=class{constructor(t,e,o){let i=this._createShader(t,t.VERTEX_SHADER,e),r=this._createShader(t,t.FRAGMENT_SHADER,o);this.gl=t,this.id=ft++,this.program=this._createProgram(t,i,r),this.uniforms={uMatrix:{name:"uMatrix",value:null,type:"mat4"}}}_createShader(t,e,o){let i=t.createShader(e);if(t.shaderSource(i,o),t.compileShader(i),t.getShaderParameter(i,t.COMPILE_STATUS))return i;console.log(t.getShaderInfoLog(i)),t.deleteShader(i)}_createProgram(t,e,o){let i=t.createProgram();if(t.attachShader(i,e),t.attachShader(i,o),t.linkProgram(i),t.getProgramParameter(i,t.LINK_STATUS))return i;console.log(t.getProgramInfoLog(i)),t.deleteProgram(i)}setUniform(t,e,o){this.uniforms[t]={name:t,value:e,type:o}}};var l=class{static createColor(t,e,o){return{r:t/255,g:e/255,b:o/255}}};l.Renderer=N;l.Orthographic=q;l.Volume=W;l.Mesh=Z;l.Geometry=z;l.Plane=$;l.Circle=K;l.Cube=J;l.Program=Q;var U=window.innerWidth/window.innerHeight,dt=document.getElementById("webgl"),g=new l.Renderer(dt);g.setPixelRatio(1);var pt=new l.Circle(.5,64),S=new l.Program(g.gl,ot,it);S.setUniform("uTime",0,"1f");S.setUniform("uResolution",[g.gl.canvas.width,g.gl.canvas.height],"2f");S.setUniform("uRed",1,"1f");S.setUniform("uGreen",.25,"1f");S.setUniform("uBlue",.5,"1f");var C=new l.Mesh(pt,S);C.setPosition(0,0,.625);var gt=new l.Cube(1,1,1,64,64,64),I=new l.Program(g.gl,rt,at);I.setUniform("uTime",0,"1f");I.setUniform("uRed",1,"1f");I.setUniform("uGreen",.25,"1f");I.setUniform("uBlue",.5,"1f");var G=new l.Mesh(gt,I);G.setRotationX(37.5);G.setRotationY(45);var tt=new l.Volume;tt.add(G);tt.add(C);var et=new l.Orthographic(-1*U,1*U,-1,1,-1,1);g.resize();C.shader.uniforms.uResolution.value=[g.gl.canvas.width,g.gl.canvas.height];g.gl.clearColor(0,0,0,0);var st=0,nt=()=>{g.render(tt,et),st+=.1,C.shader.uniforms.uTime.value=st,G.shader.uniforms.uTime.value=st,window.requestAnimationFrame(nt)};window.addEventListener("resize",()=>{g.resize()&&(U=g.gl.canvas.width/g.gl.canvas.height,et.setLeft(-1*U),et.setRight(1*U),C.shader.uniforms.uResolution.value=[g.gl.canvas.width,g.gl.canvas.height])});window.requestAnimationFrame(nt);var L=document.querySelector(".controls"),xt=document.getElementById("red"),yt=document.getElementById("green"),vt=document.getElementById("blue"),P={x1:0,y1:0,x2:0,y2:0};xt.addEventListener("input",n=>{G.shader.uniforms.uRed.value=n.target.value,C.shader.uniforms.uRed.value=n.target.value});yt.addEventListener("input",n=>{G.shader.uniforms.uGreen.value=n.target.value,C.shader.uniforms.uGreen.value=n.target.value});vt.addEventListener("input",n=>{G.shader.uniforms.uBlue.value=n.target.value,C.shader.uniforms.uBlue.value=n.target.value});L.addEventListener("mousedown",n=>{n.target.classList.contains("controls")&&(P.x1=n.clientX,P.y1=n.clientY,document.onmouseup=Mt,document.onmousemove=bt)});var bt=n=>{P.x2=P.x1-n.clientX,P.y2=P.y1-n.clientY,P.x1=n.clientX,P.y1=n.clientY,L.style.top=`${L.offsetTop-P.y2}px`,L.style.bottom="auto",L.style.left=`${L.offsetLeft-P.x2}px`},Mt=()=>{document.onmouseup=null,document.onmousemove=null};window.setTimeout(()=>{L.classList.add("active")},500);})();
