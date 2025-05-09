import { classNames } from "../libs/cls";
import { errorHandler } from "./error-handler";
import { makeTaskComplete, makeTaskInProgress, removeTask } from "../apis/task";

const generateToggleBtn = (id, isCompleted) => {
  const btn = document.createElement("button");
  btn.classList =
    "text-cool-gray-800 text-xs bg-white hover:bg-primary-50 w-full py-xs rounded-lg cursor-pointer";
  btn.innerText = isCompleted ? "In progress" : "Done";
  btn.onclick = async () => {
    try {
      if (isCompleted) await makeTaskInProgress(id);
      else await makeTaskComplete(id);
      window.location.reload();
    } catch (error) {
      errorHandler(error);
    }
  };
  return btn;
};

const generateRemoveBtn = (id) => {
  const btn = document.createElement("button");
  btn.classList =
    "text-cool-gray-800 text-xs bg-white hover:bg-primary-50 w-full py-xs rounded-lg cursor-pointer";
  btn.innerText = "Remove";
  btn.onclick = async () => {
    try {
      await removeTask(id);
      window.location.reload();
    } catch (error) {
      errorHandler(error);
    }
  };
  return btn;
};

export const generateTasksTableRow = ({
  id,
  title,
  description,
  isCompleted,
}) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
        <td class="py-md px-sm text-cool-gray-800 text-[14px]">${id}</td>
        <td class="py-md px-sm text-cool-gray-800 text-[14px] text-nowrap">
            ${title}
        </td>
        <td class="py-md px-sm text-cool-gray-800 text-[14px] text-nowrap">
            ${description}
        </td>`;

  const actionTd = document.createElement("td");
  actionTd.className = "py-md px-sm flex justify-end";

  const dropdown = document.createElement("div");
  dropdown.className =
    "absolute top-0 right-0 w-[170px] bg-white rounded-xl border border-cool-gray-50 shadow-md p-xs hidden";
  dropdown.dataset.dropDownId = id;
  dropdown.appendChild(generateToggleBtn(id, isCompleted));
  dropdown.appendChild(generateRemoveBtn(id));

  const actionBtn = document.createElement("button");
  actionBtn.className = classNames(
    "bg-cool-gray-50 w-[40px] h-[40px] rounded-xl",
    "flex justify-center items-center relative",
    "hover:bg-cool-gray-50/50 cursor-pointer"
  );
  actionBtn.innerHTML = `
    <svg width="4" height="20" viewBox="0 0 4 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.200781 18.0008C0.200781 17.0067 1.00667 16.2008 2.00078 16.2008C2.99489 16.2008 3.80078 17.0067 3.80078 18.0008C3.80078 18.995 2.99489 19.8008 2.00078 19.8008C1.00667 19.8008 0.200781 18.995 0.200781 18.0008ZM0.200781 10.0008C0.200781 9.00673 1.00667 8.20084 2.00078 8.20084C2.99489 8.20084 3.80078 9.00673 3.80078 10.0008C3.80078 10.995 2.99489 11.8008 2.00078 11.8008C1.00667 11.8008 0.200781 10.995 0.200781 10.0008ZM2.00078 0.200842C1.00667 0.200842 0.200781 1.00676 0.200781 2.00084C0.200781 2.99492 1.00667 3.80084 2.00078 3.80084C2.99489 3.80084 3.80078 2.99492 3.80078 2.00084C3.80078 1.00676 2.99489 0.200842 2.00078 0.200842Z" fill="#6B7280"/>
    </svg>
  `;
  actionBtn.onclick = () => {
    const isHide = dropdown.classList.contains("hidden");
    if (isHide) dropdown.classList.remove("hidden");
  };
  actionBtn.dataset.dropDownBtnId = id;
  actionBtn.appendChild(dropdown);
  actionTd.appendChild(actionBtn);
  tr.appendChild(actionTd);

  document.addEventListener("click", function (event) {
    if (dropdown.classList.contains("hidden")) return;
    if (dropdown.contains(event.target)) return;
    if (Number(event.target.dataset.dropDownBtnId) === id) return;
    dropdown.classList.add("hidden");
  });

  return tr;
};
