const url = "https://dummyjson.com/users";
const app = document.getElementById("app");

type gender = "male" | "female";
type dummyJsonEmail = `${string}@x.dummyjson.com`;
type usersList = { limit: number; skip: number; total: number; users: user[] };
type user = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: gender;
  email: dummyJsonEmail;
  phone: string;
  username: string;
  image: string;
};

async function fetchUsers(): Promise<usersList> {
  const response = await fetch(url, { method: "GET" });
  return await response.json();
}

function generateParagraph({ firstName, lastName, age, gender }: user) {
  return `<p>${firstName} - ${lastName} - ${age} - ${
    gender === "female" ? "F" : "M"
  }</p>`;
}

function render({ users }: usersList) {
  const paragraphs = users.map(generateParagraph);
  if (!!app) app.innerHTML = paragraphs.join("");
}

fetchUsers().then((list) => render(list));
