import * as z from "zod";

export interface ILogin {
  token: string;
}

export interface IRegister {
  user_id: number;
  images: string;
  username: string;
  email: string;
  phone_number: string;
  address: string;
}

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email("Not a valid email"),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z.string().min(1, { message: "Full name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email("Not a valid email"),
  password: z.string().min(1, { message: "Password is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
