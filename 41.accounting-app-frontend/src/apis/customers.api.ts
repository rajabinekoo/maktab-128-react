import { getApiClient } from "./client";

type getCustomersListParam = { search?: string; page?: number; limit?: number };
type getCustomersList = (
  _?: getCustomersListParam
) => Promise<IListResponse<ICustomer>>;
export const getCustomersList: getCustomersList = async (params) => {
  const response = await getApiClient().get("/customers", { params });
  return response.data;
};

type getCustomerInfo = (_?: id) => Promise<ICustomer>;
export const getCustomerInfo: getCustomerInfo = async (id) => {
  const response = await getApiClient().get(`/customers/${id}`);
  return response.data;
};

type addNewCustomer = (_: FormData) => Promise<ICustomer>;
export const addNewCustomer: addNewCustomer = async (data) => {
  const response = await getApiClient().post("/customers", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

type removeCustomer = (_: id) => Promise<void>;
export const removeCustomer: removeCustomer = async (id) => {
  await getApiClient().delete(`/customers/${id}`);
};

type updateCustomer = (_: { id: id; data: FormData }) => Promise<ICustomer>;
export const updateCustomer: updateCustomer = async ({ id, data }) => {
  const response = await getApiClient().put(`/customers/${id}`, data);
  return response.data;
};

export const convertAvatarToSrc = (avatar: string) => {
  return `http://localhost:3000/images/${avatar}`;
};
