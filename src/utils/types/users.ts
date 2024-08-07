import { z } from "zod";

const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export interface IUser {
  user_id: number;
  images: string;
  username: string;
  email: string;
  phone_number: string;
  address: string;
  password: string;
}

export const profileSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email("Not a valid email"),
  username: z.string().min(1, { message: "Full name is required" }),
  password: z.string().optional(),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  images: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Max image size is ${MAX_MB}MB`)
    .refine((file) => !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type), `Only .jpg, .jpeg, and .png formats are supported`)
    .optional(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
