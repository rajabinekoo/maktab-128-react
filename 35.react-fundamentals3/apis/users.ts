import axios from "axios";

type getUserById = (_: number) => Promise<IUser>;
export const getUserById: getUserById = async (id: number) => {
  const response = await axios.get(`https://dummyjson.com/users/${id}`);
  return response.data;
};
