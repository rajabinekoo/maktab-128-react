import { urls } from "../urls";
import { generateClient } from "../client";

export const getSneakersList: getSneakersList = async (params) => {
  const client = generateClient();
  const response = await client.get(urls.sneaker.list, { params });
  return response.data;
};
