import { z } from "zod";

export interface IProduct {
  product_id: number;
  images: string;
  product_name: string;
  price: number;
  stock: number;
  city: string;
  description: string;
}

const getProductSchema = z.object({
  product_name: z.string().min(1, { message: "Product name is required" }),
  price: z.number().min(1, { message: "Price is required" }),
  stok: z.number().min(1, { message: "Stok is required" }),
  city: z.string().min(1, { message: "City is required" }),
  desciption: z.string().min(1, { message: "Desciption is required" }),
});

export type ProductSchema = z.infer<typeof getProductSchema>;

export const CreateProductsSchema = z.object({
  images: z.string().url().min(1, "Image URL is required"), // Ensure images is a valid URL string
  product_name: z.string().min(1, "Product name is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  stock: z.number().min(1, "Stock must be greater than 0"),
  city: z.string().min(1, "City is required"),
  description: z.string().min(1, "Description is required"),
});

export type CreateProductsSchema = z.infer<typeof CreateProductsSchema>;

export const GetDetailProductSchema = z.object({
  product_id: z.number(),
  product_name: z.string(),
  price: z.number(),
  stock: z.number(),
  city: z.string(),
  description: z.string(),
});

export type GetDetailProductSchema = z.infer<typeof GetDetailProductSchema>;
