import axios from "axios";

import { baseUrl } from "./urls";
import { tokenName } from "../libs/constants";

export const generateHttpClient = () => {
  return axios.create({
    baseURL: baseUrl,
    headers: { Authorization: localStorage.getItem(tokenName) },
  });
};
