import axios from "axios";
import { baseUrl } from "./urls";

export const generateHttpClient = () => {
  return axios.create({ baseURL: baseUrl });
};
