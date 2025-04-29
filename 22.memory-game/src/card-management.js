import { shuffle } from "./utils";

function cardMarks(imgUrl) {
  return `
    <div class="absolute inset-0 size-full [backface-visibility:hidden]">
      <div
        class="flex h-full w-full flex-col items-center justify-center"
      >
        <img src="/assets/js.png" />
      </div>
    </div>
    <div class="absolute inset-0 size-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
      <div
        class="flex h-full w-full flex-col items-center justify-center"
      >
        <img src="${imgUrl}" />
      </div>
    </div>`;
}

let lastSelection = null;
let unclickable = false;
let tries = 0;
let corrects = 0;
const rotationClass = "[transform:rotateY(180deg)]";

function generateCard(imgUrl) {
  const cardBody = document.createElement("div");
  cardBody.className =
    "relative bg-gray-400 rounded-xl size-full transition duration-500 [transform-style:preserve-3d]";
  cardBody.innerHTML = cardMarks(imgUrl);
  cardBody.dataset.cardName = imgUrl
    .replace("/assets/", "")
    .replace(".png", "")
    .replace(".svg", "");

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "w-[200px] aspect-square outline-none";

  // cardBody will memoize
  btn.onclick = function () {
    if (unclickable) return;
    const flipped = cardBody.classList.contains(rotationClass);
    if (flipped) return;
    cardBody.classList.add(rotationClass);
    if (!lastSelection) {
      lastSelection = cardBody;
      return;
    }
    if (
      !!lastSelection &&
      lastSelection.dataset.cardName !== cardBody.dataset.cardName
    ) {
      unclickable = true;
      tries++;
      setTimeout(() => {
        cardBody.classList.remove(rotationClass);
        lastSelection.classList.remove(rotationClass);
        lastSelection = null;
        unclickable = false;
      }, 1000);
    }
    if (
      !!lastSelection &&
      lastSelection.dataset.cardName === cardBody.dataset.cardName
    ) {
      tries++;
      corrects++;
      lastSelection = null;
      if (corrects === cards.length / 2) {
        alert("You won");
      }
    }
  };
  btn.appendChild(cardBody);

  return btn;
}

const cards = [
  "/assets/angular.png",
  "/assets/angular.png",
  "/assets/react.png",
  "/assets/react.png",
  "/assets/vue.png",
  "/assets/vue.png",
  "/assets/nestjs.png",
  "/assets/nestjs.png",
  "/assets/ember.svg",
  "/assets/ember.svg",
  "/assets/electron.png",
  "/assets/electron.png",
];

export function renderCards() {
  const elements = shuffle(cards).map(generateCard);
  const ground = document.getElementById("ground");
  ground.innerHTML = "";
  for (const element of elements) {
    ground.appendChild(element);
  }
}
