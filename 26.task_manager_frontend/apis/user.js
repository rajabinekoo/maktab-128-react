import { urls } from "./urls";
import { generateHttpClient } from "./client";

export const getUserInfo = async () => {
  const axiosInstance = generateHttpClient();
  const response = await axiosInstance.get(urls.user.info);
  return response.data;
};
