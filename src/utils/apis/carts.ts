import { IResponse } from "../types/api";
import { CartSchema} from "../types/carts";
import { IUser } from "../types/users";
import axiosWithConfig from "./axios-with-config";

export const createCart = async (body: CartSchema) => {
  try {
    const response = await axiosWithConfig.post("/carts", body);
    return response.data as IResponse<IUser>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};
