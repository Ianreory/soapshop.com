import { z } from "zod";

export interface ICart {
    product_id: number;
    quantity: number;
}

export const cartSchema = z.object({
    product_id: z.number(),
    quantity: z.number(),
});

export type CartSchema = z.infer<typeof cartSchema>;