const formTabBtn = document.getElementById("form-tab-btn");
const tableTabBtn = document.getElementById("table-tab-btn");

formTabBtn.addEventListener("click", function () {
  content.innerHTML = renderForm();
  formTabBtn.classList.remove("bg-slate-100");
  formTabBtn.classList.add("bg-slate-200");
  tableTabBtn.classList.remove("bg-slate-200");
  tableTabBtn.classList.add("bg-slate-100");
});

tableTabBtn.addEventListener("click", function () {
  content.innerHTML = renderTable();
  tableTabBtn.classList.remove("bg-slate-100");
  tableTabBtn.classList.add("bg-slate-200");
  formTabBtn.classList.remove("bg-slate-200");
  formTabBtn.classList.add("bg-slate-100");
});
