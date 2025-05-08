import { urls } from "./urls";
import { generateHttpClient } from "./client";

export const login = async (body) => {
  if (!body.username) throw new Error("Username is required");
  if (!body.password) throw new Error("Password is required");
  const response = await generateHttpClient().post(urls.auth.login, body);
  return response.data;
};

export const signup = async (body) => {
  if (!body.username) throw new Error("Username is required");
  if (!body.password) throw new Error("Password is required");
  const response = await generateHttpClient().post(urls.auth.signup, body);
  return response.data;
};
