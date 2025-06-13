import axios from "axios";

type getAllPosts = () => Promise<IPostsList>;
export const getAllPosts: getAllPosts = async () => {
  const response = await axios.get("https://dummyjson.com/posts");
  return response.data;
};
