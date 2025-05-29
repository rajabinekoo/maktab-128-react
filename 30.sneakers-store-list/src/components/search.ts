import { debounce } from "../libs/debounce";

export const generateSearchInput = () => {
  const input = document.createElement("input");
  const url = new URL(window.location.href);
  const onChangeSearch = debounce(() => {
    url.searchParams.set("s", input.value);
    window.location.href = url.href;
  }, 1000);
  input.value = url.searchParams.get("s") || "";
  input.type = "text";
  input.className =
    "w-full border border-slate-400 rounded-lg px-2 py-3 text-slate-800";
  input.addEventListener("input", function () {
    onChangeSearch();
  });
  return input;
};
