import { urls } from "./urls";
import { generateHttpClient } from "./client";

export const tasksList = async () => {
  const axiosInstance = generateHttpClient();
  const response = await axiosInstance.get(urls.task.list);
  return response.data;
};

export const newTask = async (body) => {
  const axiosInstance = generateHttpClient();
  const response = await axiosInstance.post(urls.task.new, body);
  return response.data;
};

export const makeTaskInProgress = async (taskId) => {
  const axiosInstance = generateHttpClient();
  const response = await axiosInstance.patch(urls.task.inprogress(taskId));
  return response.data;
};

export const makeTaskComplete = async (taskId) => {
  const axiosInstance = generateHttpClient();
  const response = await axiosInstance.patch(urls.task.done(taskId));
  return response.data;
};

export const removeTask = async (taskId) => {
  const axiosInstance = generateHttpClient();
  const response = await axiosInstance.delete(urls.task.delete(taskId));
  return response.data;
};
