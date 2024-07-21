import Cookies from "js-cookie";
import { IResponse } from "../types/api";
import { IUser, ProfileSchema } from "../types/users";
import axiosWithConfig from "./axios-with-config";

export const getProfile = async () => {
  
  try {
    const response = await axiosWithConfig.get("/users");
    Cookies.get("token");

    return response.data as IResponse<IUser>;
  } catch (error: any) {
    const { message } = error.response.data;

    throw Error(message);
  }
};

export const updateProfile = async (body: ProfileSchema) => {
  try {
    const response = await axiosWithConfig.put("/users", body);
    Cookies.get("token"); 
    
    return response.data as IResponse<undefined>;
  } catch (error: any) {
    const { message } = error.response.data;

    throw Error(message);
  }
};

export const deleteProfile = async () => {
  try {
    const response = await axiosWithConfig.delete("/users");
    Cookies.get("token");

    return response.data as IResponse<undefined>;
  } catch (error: any) {
    const { message } = error.response.data;

    throw Error(message);
  }
};
