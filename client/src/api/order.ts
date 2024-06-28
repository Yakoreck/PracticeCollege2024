import axios, { AxiosResponse } from "axios";
import instance from ".";
import { message } from "antd";


export interface CartData {
  userId: number;
  items: {
    productId: number;
    quantity: number;
  }[];
}




export const createOrder = async (cartData: CartData): Promise<any> => {
  try {
    const response: AxiosResponse = await instance.post(
      "/api/orders/",
      cartData
    );
    message.success("Success");
    return response.data;
  } catch (error: any) {
    message.error(error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const getAllOrders = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await instance.get(`/api/orders`);
    return response.data;
  } catch (error: any) {
    message.error(error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const getOrdersByUserId = async (userId: number): Promise<any> => {
  try {
    const response: AxiosResponse = await instance.get(
      `/api/orders/user/${userId}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const deleteOrder = async (orderId: number): Promise<any> => {
  try {
    const response: AxiosResponse = await instance.delete(
      `/api/orders/${orderId}`
    );
    return response.data;
  } catch (error: any) {
    message.error(error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};
