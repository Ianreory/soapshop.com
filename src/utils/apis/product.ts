
import { IResponse } from "../types/api";
import { CreateProductsSchema, IProduct } from "../types/product";
import axiosWithConfig from "./axios-with-config";

export const getProducts = async () => {
  try {
    const response = await axiosWithConfig.get("/products");
    return response.data as IResponse<IProduct[]>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};

export const getUserProduct = async () => {
  try {
    const response = await axiosWithConfig.get("/users/products");
    return response.data as IResponse<IProduct[]>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};

export const CreateProduct = async (body: CreateProductsSchema) => {
  try {
    const response = await axiosWithConfig.post("/products", body);

    return response.data as IResponse<IProduct>;
  } catch (error: any) {
    const { message } = error.response.data;

    throw Error(message);
  }
};

export const getDetailProduct = async (id: number) => {
  try {
    const response = await axiosWithConfig.get(`/products/${id}`);
    return response.data as IResponse<IProduct>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};

export const updateProduct = async (id: number, body: CreateProductsSchema) => {
  try {
    const response = await axiosWithConfig.put(`/products/${id}`, body);
    return response.data as IResponse<IProduct>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const response = await axiosWithConfig.delete(`/products/${id}`);
    return response.data as IResponse<IProduct>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};
