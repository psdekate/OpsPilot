import apiClient from "./client";

export const getUsers = async () => {
  const response = await apiClient.get("/users");

  return response.data;
};

export const deleteUser = async (id) => {
  const response = await apiClient.delete(`/users/${id}`);

  return response;
};

export const updateUser = async (updatedUser) => {
  const response = await apiClient.put(`/users/${updatedUser.id}`, updatedUser);

  return response.data;
};
