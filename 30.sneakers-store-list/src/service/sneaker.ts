import { getSneakersList } from "../../apis/services/sneaker.service";
import { generateSneakerList } from "../containers/sneaker";

// encapsulate
let page = 1;
const limit = 10;
let isLoading = false;
const sneakers: sneakerEntity[] = [];
const app = document.querySelector<HTMLDivElement>("#app")!;

export const increasePage = () => page++;

export const fetchNewPage = async () => {
  if (isLoading) return;
  isLoading = true;
  const url = new URL(window.location.href);
  const brands = url.searchParams.getAll("brands");
  const data = await getSneakersList({
    page,
    limit,
    search: url.searchParams.get("s") || undefined,
    brands: !!brands?.length ? brands : undefined,
  });
  sneakers.push(...data.data);
  isLoading = false;
};

export const renderSneakersList = () => {
  app.appendChild(generateSneakerList(sneakers));
};
