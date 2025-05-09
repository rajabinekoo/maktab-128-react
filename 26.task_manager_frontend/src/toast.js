export const showToast = (msg, type = "danger", timeout = 2000) => {
  const toastWrapper = document.createElement("div");
  toastWrapper.className = `fixed py-xs px-md flex justify-between items-start max-w-[300px] gap-x-sm top-md right-md bg-${type}-100 border border-${type}-500 rounded-xl text-${type}-800 z-50`;

  const pMsg = document.createElement("p");
  pMsg.innerText = msg;
  toastWrapper.appendChild(pMsg);

  const closeBtn = document.createElement("button");
  closeBtn.className = "cursor-pointer mt-xs";
  closeBtn.innerHTML = `
       <svg
         width="16"
         height="16"
         viewBox="0 0 16 16"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
       >
         <path
           fill-rule="evenodd"
           clip-rule="evenodd"
           d="M14.8504 2.45054C15.2097 2.09126 15.2097 1.50874 14.8504 1.14946C14.4912 0.790185 13.9086 0.790185 13.5494 1.14946L7.99989 6.69894L2.45043 1.14946C2.09113 0.790185 1.50862 0.790185 1.14934 1.14946C0.790063 1.50874 0.790063 2.09126 1.14934 2.45054L6.69881 8.00001L1.14934 13.5495C0.790063 13.9088 0.790063 14.4912 1.14934 14.8506C1.50862 15.2098 2.09113 15.2098 2.45043 14.8506L7.99989 9.30108L13.5494 14.8506C13.9086 15.2098 14.4912 15.2098 14.8504 14.8506C15.2097 14.4912 15.2097 13.9088 14.8504 13.5495L9.30096 8.00001L14.8504 2.45054Z"
           class="fill-${type}-700"
           fill="#6B7280"
         />
       </svg>
  `;
  closeBtn.addEventListener("click", function () {
    toastWrapper.remove();
  });
  setTimeout(() => {
    toastWrapper.remove();
  }, timeout);
  toastWrapper.appendChild(closeBtn);
  document.body.appendChild(toastWrapper);
};
