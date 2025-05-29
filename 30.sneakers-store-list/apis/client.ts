import axios from "axios";

export const generateClient = () => {
  return axios.create({ baseURL: "http://localhost:3000" });
};
