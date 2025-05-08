import { signup } from "../apis/auth";

const username = document.getElementById("username");
const password = document.getElementById("password");
const rpassword = document.getElementById("rpassword");

const systemErr = document.getElementById("system-err");
const usernameErr = document.getElementById("username-err");
const passwordErr = document.getElementById("password-err");
const repeatPasswordErr = document.getElementById("rpassword-err");

const showErrors = (msg) => {
  if (msg.includes("username")) {
    usernameErr.innerText = msg;
    usernameErr.classList.remove("hidden");
  } else if (msg.includes("password")) {
    passwordErr.innerText = msg;
    passwordErr.classList.remove("hidden");
  } else {
    systemErr.innerText = msg;
    systemErr.classList.remove("hidden");
  }
};

const clearError = () => {
  systemErr.classList.add("hidden");
  usernameErr.classList.add("hidden");
  passwordErr.classList.add("hidden");
  repeatPasswordErr.classList.add("hidden");
};

document
  .getElementById("signup-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    clearError();
    const usernameValue = username.value;
    const passwordValue = password.value;
    const rpasswordValue = rpassword.value;
    if (rpasswordValue !== passwordValue) {
      repeatPasswordErr.innerText = "Password and repeat password are not the same";
      repeatPasswordErr.classList.remove("hidden");
      return;
    }
    const data = { username: usernameValue, password: passwordValue };
    try {
      const resBody = await signup(data);
      console.log(resBody);
    } catch (error) {
      const msg = error.response?.data?.message;
      if (Array.isArray(msg)) {
        msg.forEach(showErrors);
        return;
      }
      if (typeof msg === "string") {
        showErrors(msg);
        return;
      }
      console.log(error);
      showErrors("Something went wrong");
    }
  });
