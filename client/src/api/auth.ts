import axios, { AxiosResponse } from "axios";
import instance from ".";
import { message } from "antd";


export interface UserDataLogin {
  email: string;
  password: string;
}

export interface UserDataRegister {
  email: string;
  name: string;
  password: string;
}


export interface AuthResponse {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  token: string;
}


export const login = async (userData: UserDataLogin): Promise<AuthResponse> => {
  try {
    const response: AxiosResponse<AuthResponse> = await instance.post(
      "/api/users/login",
      userData
    );
    
    localStorage.setItem("token", response.data.token);
    message.success("Success login");
    return response.data;
  } catch (error: any) {
    message.error(error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};


export const register = async (
  userData: UserDataRegister
): Promise<AuthResponse> => {
  try {
    const response: AxiosResponse<AuthResponse> = await instance.post(
      "/api/users/",
      userData
    );
    localStorage.setItem("token", response.data.token);
    message.success("Success register");
    return response.data;
  } catch (error: any) {
    message.error(error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};
