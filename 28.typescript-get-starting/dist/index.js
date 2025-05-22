"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = "https://dummyjson.com/users";
const app = document.getElementById("app");
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url, { method: "GET" });
        return yield response.json();
    });
}
function generateParagraph({ firstName, lastName, age, gender }) {
    return `<p>${firstName} - ${lastName} - ${age} - ${gender === "female" ? "F" : "M"}</p>`;
}
function render({ users }) {
    const paragraphs = users.map(generateParagraph);
    if (!!app)
        app.innerHTML = paragraphs.join("");
}
fetchUsers().then((list) => render(list));
