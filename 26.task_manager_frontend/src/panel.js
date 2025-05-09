import { getUserInfo } from "../apis/user";
import { tokenName } from "../libs/constants";
import { errorHandler } from "./error-handler";
import { newTask, tasksList } from "../apis/task";
import { showToast } from "./toast";
import { generateTasksTableRow } from "./table";
import { addEmptyRow } from "./empty";

// guard
if (!localStorage.getItem(tokenName)) {
  location.href = "/login";
}

// object models
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const titleInputErr = document.getElementById("title-err");
const descriptionInputErr = document.getElementById("description-err");

const newTaskBtn = document.getElementById("new-task-btn");
const newTaskForm = document.getElementById("new-task-form");
const completedBody = document.getElementById("completed-tbody");
const closeDialogBtn = document.getElementById("close-dialog-box");
const newTaskDialogBox = document.getElementById("new-task-dialog-box");
const inProgressTableBody = document.getElementById("in-progress-tbody");
const newTaskDialogOverlay = document.getElementById("new-task-overlay");
const usernamePlaceholder = document.getElementById("username-placeholder");

// handlers
newTaskBtn.addEventListener("click", function () {
  newTaskDialogOverlay.classList.remove("hidden");
  titleInput.value = "";
  descriptionInput.value = "";
});

newTaskDialogOverlay.addEventListener("click", function (event) {
  if (!newTaskDialogBox.contains(event.target)) {
    newTaskDialogOverlay.classList.add("hidden");
  }
});

closeDialogBtn.addEventListener("click", function () {
  newTaskDialogOverlay.classList.add("hidden");
});

const showErrors = (msg) => {
  if (msg.includes("title")) {
    titleInputErr.innerHTML += `<p>${msg}.</p>`;
    titleInputErr.classList.remove("hidden");
  } else if (msg.includes("description")) {
    descriptionInputErr.innerHTML += `<p>${msg}.</p>`;
    descriptionInputErr.classList.remove("hidden");
  }
};

const clearErrors = () => {
  titleInputErr.innerText = "";
  descriptionInputErr.innerText = "";
  titleInputErr.classList.add("hidden");
  descriptionInputErr.classList.add("hidden");
};

newTaskForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const title = titleInput.value;
  const description = descriptionInput.value;
  clearErrors();
  try {
    const task = await newTask({ title, description });
    showToast("Task was created", "success");
    newTaskDialogOverlay.classList.add("hidden");
  } catch (error) {
    const parsedError = errorHandler(error);
    if (Array.isArray(parsedError)) parsedError.forEach(showErrors);
    else if (typeof parsedError === "string") showErrors(parsedError);
  }
});

// data fetching
async function init() {
  try {
    const info = await getUserInfo();
    const tasks = await tasksList();
    tasks.forEach((el) =>
      !el.isCompleted
        ? inProgressTableBody.appendChild(generateTasksTableRow(el))
        : completedBody.appendChild(generateTasksTableRow(el))
    );

    if (!inProgressTableBody.children.length) {
      addEmptyRow(inProgressTableBody);
    }
    if (!completedBody.children.length) {
      addEmptyRow(completedBody);
    }

    usernamePlaceholder.innerText = info.username;
  } catch (error) {
    errorHandler(error);
  }
}
init();
