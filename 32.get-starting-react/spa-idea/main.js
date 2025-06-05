const root = document.getElementById("root");

// pages

const clearPage = () => {
  root.innerHTML = "";
};

const homePage = () => {
  clearPage();
  navigationBar();
  const h1 = document.createElement("h1");
  h1.innerText = "Home";
  root.appendChild(h1);
};

const aboutPage = () => {
  clearPage();
  navigationBar();
  const h1 = document.createElement("h1");
  h1.innerText = "About";
  root.appendChild(h1);
};

const contactPage = () => {
  clearPage();
  navigationBar();
  const h1 = document.createElement("h1");
  h1.innerText = "Contact";
  root.appendChild(h1);
};

// components

const navigationHandler = (event) => {
  const href = event.target.dataset.href;
  if (href === "home") {
    homePage();
  } else if (href === "about") {
    aboutPage();
  } else if (href === "contact") {
    contactPage();
  }
};

const navigationBar = () => {
  const ul = document.createElement("ul");
  const list = ["home", "about", "contact"];
  for (const l of list) {
    const li = document.createElement("li");
    li.innerText = l;
    li.dataset.href = l;
    li.onclick = navigationHandler;
    ul.appendChild(li);
  }
  root.appendChild(ul);
};

homePage();
