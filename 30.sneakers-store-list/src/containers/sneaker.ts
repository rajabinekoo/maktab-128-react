import { generateSneakerCard } from "../components/sneaker";
import {
  fetchNewPage,
  increasePage,
  renderSneakersList,
} from "../service/sneaker";

// export const generateSneakerList = (
//   children: sneakerEntity[],
//   cb: () => void
// ) => {
//   const section = document.createElement("section");
//   section.className = "px-3 grid grid-cols-2 gap-3 py-4";
//   section.innerHTML = children.map(generateSneakerCard).join("");
//   window.addEventListener("scroll", function () {
//     if (
//       window.scrollY + window.innerHeight >=
//       section.offsetTop + section.offsetHeight - 50
//     ) {
//       cb();
//     }
//   });
//   return section;
// };

export const generateSneakerList = (children: sneakerEntity[]) => {
  const section = document.createElement("section");
  section.className = "grid grid-cols-2 gap-3 py-4";
  section.innerHTML = children.map(generateSneakerCard).join("");
  window.addEventListener("scroll", async function () {
    if (
      window.scrollY + window.innerHeight >=
      section.offsetTop + section.offsetHeight - 50
    ) {
      increasePage();
      await fetchNewPage();
      renderSneakersList();
    }
  });
  return section;
};
