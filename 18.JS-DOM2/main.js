// ====== mouse event handlers ======

// document.getElementById("box").addEventListener("mouseenter", function () {
//   console.log("mouse enter");
// });

// document.getElementById("box").addEventListener("mouseleave", function () {
//   console.log("mouse leave");
// });

// document.getElementById("box").addEventListener("mousemove", function (event) {
//   console.log("mouse move, offset", event.offsetX, event.offsetY);
//   console.log("mouse move, page", event.pageX, event.pageY);
// });

// document.getElementById("box").addEventListener("mouseover", function (event) {
//   if (event.target.classList.contains("child-box")) {
//     console.log("mouse over", event.target);
//   }
// });

// document.getElementById("box").addEventListener("click", function (event) {
//   console.log("clicked", event.target);
// });

// document
//   .getElementById("box")
//   .addEventListener("contextmenu", function (event) {
//     console.log("double clicked", event.target);
//   });

// document.getElementById("box").addEventListener("dblclick", function (event) {
//   console.log("double clicked", event.target);
// });

// ====== keyboard event handlers ======

// document.getElementById("inp1").addEventListener("keydown", (event) => {
//   console.log("keydown", event.target.value);
// });

// document.getElementById("inp1").addEventListener("keypress", (event) => {
//   console.log("keypress", event.target.value);
// });

// document.getElementById("inp1").addEventListener("input", (event) => {
//   console.log("input", event.target.value);
// });

// document.getElementById("inp1").addEventListener("keyup", (event) => {
//   console.log("keyup", event.target.value);
// });

// ============ form ============
// solution1: directly
// document.getElementById("signup-form-btn").addEventListener("click", () => {
//   const inputs = document.getElementsByClassName("signup-form");
//   //   const values = {
//   //     email: inputs.email.value,
//   //     username: inputs.username.value,
//   //     password: inputs.password.value,
//   //   };
//   const values = {};
//   for (const inp of inputs) {
//     values[inp.name] = inp.value;
//   }
//   console.log(values);
// });

// solution2: state-based
// const values = {};
// const inputs = document.getElementsByClassName("signup-form");
// for (const inp of inputs) {
//   inp.addEventListener(
//     "input",
//     (event) => (values[event.target.name] = event.target.value)
//   );
// }
// document
//   .getElementById("signup-form-btn")
//   .addEventListener("click", () => console.log(values));

// solution3: form-based
// document.getElementById("form").addEventListener("submit", (event) => {
//   event.preventDefault();
//   const values = {};
//   for (const child of event.target.children) {
//     if (child.tagName !== "INPUT") continue;
//     values[child.name] = child.value;
//   }
//   console.log(values);
// });
