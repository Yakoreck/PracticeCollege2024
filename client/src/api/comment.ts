import { AxiosResponse } from "axios";
import instance from ".";

export interface CommentResponse {
  name: string;
  description: string;
}

export const getCommentsByProductId = async (
  productId: string
): Promise<CommentResponse[]> => {
  try {
    const response: AxiosResponse<CommentResponse[]> = await instance.get(
      `/api/comments/${productId}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};
