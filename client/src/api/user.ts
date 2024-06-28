import { AxiosResponse } from "axios";
import instance from ".";
import { message } from "antd";

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

export interface UserUpdateData {
  name?: string;
  email?: string;
  role?: "user" | "admin";
}

export const getAllUsers = async (): Promise<UserResponse[]> => {
  try {
    const response: AxiosResponse<UserResponse[]> = await instance.get(
      "/api/users"
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const deleteUser = async (userId: number): Promise<any> => {
  try {
    const response: AxiosResponse = await instance.delete(
      `/api/users/${userId}`
    );
    return response.data;
  } catch (error: any) {
    message.error(error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const updateUser = async (
  id: number,
  data: UserUpdateData
): Promise<any> => {
  try {
    const response: AxiosResponse = await instance.put(
      `/api/users/${id}`,
      data
    );
    return response.data;
  } catch (error: any) {
    message.error(error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};
