import { AxiosResponse } from "axios";
import instance from ".";
import { message } from "antd";

export interface ProductResponse {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string | null;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  price: number;
  description: string;
  imageUrl: string | null;
}

export interface UpdateProductData {
  name?: string;
  price?: number;
  description?: string;
  imageUrl?: string | null;
}

export const getAllProducts = async (): Promise<ProductResponse[]> => {
  try {
    const response: AxiosResponse<ProductResponse[]> = await instance.get(
      "/api/products"
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const getProductById = async (id: string): Promise<ProductResponse> => {
  try {
    const response: AxiosResponse<ProductResponse> = await instance.get(
      `/api/products/${id}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const getMostPopular = async (): Promise<ProductResponse[]> => {
  try {
    const response: AxiosResponse<ProductResponse[]> = await instance.get(
      "/api/products/popular"
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const getLatest = async (): Promise<ProductResponse[]> => {
  try {
    const response: AxiosResponse<ProductResponse[]> = await instance.get(
      "/api/products/latest"
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const getByCategory = async (
  category: string
): Promise<ProductResponse[]> => {
  try {
    const response: AxiosResponse<ProductResponse[]> = await instance.get(
      `/api/products/category/${category}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const deleteProduct = async (productId: number): Promise<any> => {
  try {
    const response: AxiosResponse = await instance.delete(
      `/api/products/${productId}`
    );
    return response.data;
  } catch (error: any) {
    message.error(error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const updateProduct = async (
  id: number,
  data: UpdateProductData
): Promise<any> => {
  try {
    const response: AxiosResponse = await instance.put(
      `/api/products/${id}`,
      data
    );
    return response.data;
  } catch (error: any) {
    message.error(error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const createProduct = async (data: CreateProductData): Promise<any> => {
  try {
    const response: AxiosResponse = await instance.post(`/api/products/`, data);
    return response.data;
  } catch (error: any) {
    message.error(error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};
