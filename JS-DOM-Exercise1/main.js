const formTabBtn = document.getElementById("form-tab-btn");
const tableTabBtn = document.getElementById("table-tab-btn");
const content = document.getElementById("content");
content.innerHTML = renderForm();

function formSubmitHandler(event) {
  event.preventDefault();
  console.log("submit");
}

const formState = {
  movieName: "",
  movieRate: "",
  errors: {
    movieName: " ",
    movieRate: " ",
  },
  movieNameValidation() {
    if (this.movieName.length < 5) {
      return "Must be more then 5 characters";
    }
    return "";
  },
  movieRateValidation() {
    const rate = Number(this.movieRate);
    if (isNaN(rate)) return "Must be number";
    if (rate <= 0 || rate > 10)
      return "Must be more then 0 and less then or equal 10";
    return "";
  },
  showError(event, errMsgId, errMsg) {
    const errElement = document.getElementById(errMsgId);
    if (!!errMsg) {
      errElement.classList.remove("hidden");
      errElement.innerText = errMsg;
      event.target.classList.add("!border-red-300");
      event.target.classList.add("!outline-red-400");
    } else {
      errElement.classList.add("hidden");
      event.target.classList.remove("!border-red-300");
      event.target.classList.remove("!outline-red-400");
    }
  },
  checkSubmitBtn() {
    const formSubmitBtn = document.getElementById("formSubmitBtn");
    formSubmitBtn.disabled = !Object.values(this.errors).every((err) => !err);
  },
  movieNameChange(event) {
    this.movieName = event.target.value;
    this.errors.movieName = this.movieNameValidation();
    this.showError(event, "movieNameError", this.errors.movieName);
    this.checkSubmitBtn();
  },
  movieRateChange(event) {
    this.movieRate = event.target.value;
    this.errors.movieRate = this.movieRateValidation();
    this.showError(event, "movieRateError", this.errors.movieRate);
    this.checkSubmitBtn();
  },
};

function renderForm() {
  return `<form
          onsubmit="formSubmitHandler(event)"
          class="mx-auto max-w-[500px] bg-white border-2 border-slate-200 rounded-xl p-4 space-y-3"
        >
          <p class="font-semibold text-xl text-slate-600">Add Movie</p>
          <div>
            <label class="text-xs text-slate-400 font-semibold"
              >Movie Name</label
            >
            <input
              type="text"
              name="movieName"
              oninput="formState.movieNameChange(event)"
              placeholder="ex: Batman"
              class="border-2 border-slate-300 rounded-lg px-2 py-1 w-full placeholder:text-slate-400 placeholder:text-xs"
            />
            <p id="movieNameError" class="text-[10px] font-semibold text-red-400 mt-1 hidden"></p>
          </div>
          <div>
            <label class="text-xs text-slate-400 font-semibold"
              >Movie Rate</label
            >
            <input
              type="text"
              oninput="formState.movieRateChange(event)"
              name="movieRate"
              placeholder="ex: 7.5"
              class="border-2 border-slate-300 rounded-lg px-2 py-1 w-full placeholder:text-slate-400 placeholder:text-xs"
            />
            <p id="movieRateError" class="text-[10px] font-semibold text-red-400 mt-1 hidden"></p>
          </div>
          <button
            disabled
            type="submit"
            id="formSubmitBtn"
            class="bg-slate-500 w-full rounded-lg py-1 mt-3 text-white text-sm hover:bg-slate-400 cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </form>`;
}

function renderTable() {
  return `<p>table</p>`;
}

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
