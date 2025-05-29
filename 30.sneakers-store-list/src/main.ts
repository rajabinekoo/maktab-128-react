import { generateSearchInput } from "./components/search";
import { generateSneakerList } from "./containers/sneaker";
import { fetchNewPage, renderSneakersList } from "./service/sneaker";
import "./style.css";

// let page = 1;
// let isLoading = false;
// const limit = 10;
// const sneakers: sneakerEntity[] = [];
const app = document.querySelector<HTMLDivElement>("#app")!;

// const fetchNewPage = async () => {
//   const data = await getSneakersList({ page, limit });
//   sneakers.push(...data.data);
// };

// const renderSneakersList = () => {
//   app.appendChild(
//     generateSneakerList(sneakers, async () => {
//       if (isLoading) return;
//       isLoading = true;
//       await new Promise((resolve, _) =>
//         setTimeout(() => {
//           resolve(undefined);
//         }, 2000)
//       );
//       page += 1;
//       await fetchNewPage();
//       renderSneakersList();
//       isLoading = false;
//     })
//   );
// };

async function main() {
  app.appendChild(generateSearchInput());
  await fetchNewPage();
  renderSneakersList();
}

main();
