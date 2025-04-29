const text = `
Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus
porro officiis provident animi eius, natus distinctio nesciunt libero. Sed
quia placeat fuga! Sapiente nemo repellat voluptate vero perferendis odio
fugiat?
`;

const testParagraph = "<p>Hello maktab 128</p>";

const pObject = document.getElementById("demo");
pObject.innerText = text.trim();

const pObjects = document.getElementsByTagName("p");
console.log(pObjects);

const courseTextElements = document.getElementsByClassName("course");
console.log(courseTextElements);
for (let i = 0; i < courseTextElements.length; i++) {
  if (courseTextElements[i].classList.contains("first")) {
    console.log(courseTextElements[i].tagName);
  }
}

const pObject2 = document.querySelector("#demo");
console.log(pObject2);

const pObjects2 = document.querySelectorAll("p");
console.log(pObjects2);

const courseTextElements2 = document.querySelectorAll(".course");
console.log(courseTextElements2);

console.log(document.getElementsByTagName("a"));

document.getElementById("test").innerHTML = testParagraph;
document.getElementById("test").innerHTML += testParagraph;
console.log(document.getElementById("test").innerHTML);

// ====================================================================================

const testParagraph2 = document.createElement("p");
const testParagraph2Text = document.createTextNode("Hello maktab 128 - 2");
testParagraph2.appendChild(testParagraph2Text);
testParagraph2.id = "123";
testParagraph2.title = "para";
testParagraph2.classList.add("title");
testParagraph2.classList.add("title2");
console.log(testParagraph2.classList.contains("title2"));
testParagraph2.classList.replace("title2", "title3");
// testParagraph2.classList.toggle("title3");
testParagraph2.classList.remove("title3");
testParagraph2.className = "title";
testParagraph2.setAttribute("clicked", "true");
console.log(testParagraph2.getAttribute("clicked"));

const testParagraph22 = document.createElement("p");
const testParagraph22Text = document.createTextNode("Hello maktab 128 - 3");
testParagraph22.appendChild(testParagraph22Text);

const testParagraph222 = document.createElement("p");
const testParagraph222Text = document.createTextNode("Hello maktab 128 - 4");
testParagraph222.appendChild(testParagraph222Text);

// CSS in JS -> JSS
testParagraph222.style.color = "red";
testParagraph222.style.borderStyle = "solid";
testParagraph222.style.borderColor = "black";
testParagraph222.style.borderWidth = "1px";
testParagraph222.style.padding = "10px 5px";

document.getElementById("test2").appendChild(testParagraph2);
document.getElementById("test2").appendChild(testParagraph22);
// document.getElementById("test2").removeChild(testParagraph22);
document
  .getElementById("test2")
  .replaceChild(testParagraph222, testParagraph22);

// ====================================================================================
// onclick event handler

const submit = (parameter) => {
  console.log("ok", parameter);
  // document.getElementById("submit-btn").click();
};

// document.getElementById("submit-btn").addEventListener("click", submit);

document.getElementById("submit-btn").onclick = () => {
  console.log("ok2");
};
