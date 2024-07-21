import { IResponse } from "@/utils/types/api";
import axiosWithConfig from "./axios-with-config";
import { ILogin, IRegister, LoginSchema, RegisterSchema } from "../types/auth";

export const userLogin = async (body: LoginSchema) => {
  try {
    const response = await axiosWithConfig.post("/login", body);

    return response.data as IResponse<ILogin>;
  } catch (error: any) {
    const { message } = error.response.data;

    throw Error(message);
  }
};

export const userRegistrasi = async (body: RegisterSchema) => {
  try {
    const response = await axiosWithConfig.post("/users", body);

    return response.data as IResponse<IRegister>;
  } catch (error: any) {
    const { message } = error.response.data;

    throw Error(message);
  }
};
