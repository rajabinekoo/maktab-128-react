const url = "https://reqres.in/api/users";
const rootElement = document.getElementById("root");

const generateUserCard = ({ first_name, last_name, email, avatar }) => {
  return `
    <div class="bg-white shadow-md rounded-lg p-2">
      <img
        class="rounded-md w-full h-[200px] object-cover object-center"
        src="${avatar}"
        alt="happy_man"
      />
      <div class="pt-2 space-y-2">
        <div>
          <p class="font-semibold text-sm">FirstName:</p>
          <p class="text-xs font-medium">${first_name}</p>
        </div>
        <div>
          <p class="font-semibold text-sm">LastName:</p>
          <p class="text-xs font-medium">${last_name}</p>
        </div>
        <div>
          <p class="font-semibold text-sm">Email:</p>
          <p class="text-xs font-medium">${email}</p>
        </div>
      </div>
    </div>`;
};

const req = new XMLHttpRequest();
req.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    const resBody = JSON.parse(this.responseText);
    const userCards = [];
    for (const user of resBody.data) {
      userCards.push(generateUserCard(user));
    }
    rootElement.innerHTML = userCards.join("");
  }
};
req.open("GET", url, true);
req.send(); // blocking -> non-blocking | sync -> async

console.log("Critical Code Section");

// ======= JSON stringify and parsing (marshalling and unmarshalling) =======

// const teacher = { name: "Ali Rajabi Nekoo", course: "React" };
// console.log(typeof teacher, teacher);

// const teacherJSON = JSON.stringify(teacher);
// console.log(typeof teacherJSON, teacherJSON);

// const teacherParsed = JSON.parse(teacherJSON);
// console.log(typeof teacherParsed, teacherParsed);
