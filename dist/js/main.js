(() => {
  // src/js/modules/Sandbox.js
  var Sandbox = class {
    constructor() {
    }
  };

  // src/js/main.js
  var webgl = document.getElementById("webgl");
  var glContext = webgl.getContext("webgl", {
    powerPreference: "high-performance"
  });
  console.log(Sandbox);
})();
