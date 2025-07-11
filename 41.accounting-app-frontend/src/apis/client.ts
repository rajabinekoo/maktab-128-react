import axios from "axios";

export const getApiClient = () => {
  return axios.create({ baseURL: "http://localhost:3000" });
};
