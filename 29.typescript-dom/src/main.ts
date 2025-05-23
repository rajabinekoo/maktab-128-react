import "./style.css";

type formStateType = {
  username: string;
  password: string;
  rememberMe: boolean;
};
const formState: formStateType = {
  username: "",
  password: "",
  rememberMe: false,
};

function rememberCheckBox() {
  const div = document.createElement("div");
  const input = document.createElement("input");
  input.type = "checkbox";
  input.oninput = (event: Event) => {
    const inp = event.target! as HTMLInputElement;
    formState.rememberMe = inp.checked;
  };
  div.appendChild(input);
  const label = document.createElement("label");
  label.innerText = "Remember me";
  label.className = "text-sm text-slate-500 font-medium pl-2";
  div.appendChild(label);
  return div;
}

function generateInput(inputName: keyof Omit<formStateType, "remember">) {
  const parentDiv = document.createElement("div");
  parentDiv.className = "grid grid-cols-1 gap-y-2";

  const label = document.createElement("label");
  label.className = "text-sm text-slate-500 font-medium";
  label.innerText =
    inputName[0].toUpperCase() + inputName.slice(1).toLowerCase();

  const input = document.createElement("input");
  input.type = inputName === "password" ? "password" : "text";
  input.placeholder = inputName.toLowerCase();
  input.oninput = (event: Event) => {
    if (!event.target) return;
    const inp = event.target as HTMLInputElement;
    if (inputName === "username") formState.username = inp.value;
    else if (inputName === "password") formState.password = inp.value;
    console.log(formState);
  };
  input.className =
    "border border-slate-200 rounded-md placeholder:text-slate-600 placeholder:text-xs px-2 py-1";

  parentDiv.appendChild(label);
  parentDiv.appendChild(input);
  return parentDiv;
}

const form = document.querySelector<HTMLDivElement>("#form")!;
form.appendChild(generateInput("username"));
form.appendChild(generateInput("password"));
form.appendChild(rememberCheckBox());
