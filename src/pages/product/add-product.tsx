import Layout from "@/components/layout";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CreateProductsSchema } from "@/utils/types/product";
import { CreateProduct } from "@/utils/apis/product";
import { z } from "zod";

export default function AddProduct() {
  const navigate = useNavigate();
  const [body, setBody] = useState<CreateProductsSchema>({
    images: "",
    product_name: "",
    city: "",
    description: "",
    price: 0,
    stock: 0,
  });
  const [errors, setErrors] = useState<{ [key in keyof CreateProductsSchema]?: string }>({}); // To store errors for each field

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Clear previous errors
    setErrors({});

    // Validate the form data against CreateProductsSchema
    try {
      CreateProductsSchema.parse(body); // Ensure body conforms to the schema
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key in keyof CreateProductsSchema]?: string } = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0] as keyof CreateProductsSchema] = err.message;
        });
        setErrors(newErrors);
        return;
      }
      setErrors({}); // Handle unexpected errors
      console.error(error);
      return;
    }

    try {
      // Send FormData to API
      const response = await CreateProduct(body);
      navigate("/users/products");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center dark:bg-gray-900 py-11">
        <Card className="w-full max-w-md bg-[#1e293b]">
          <CardHeader>
            <CardTitle>Create Product Now</CardTitle>
            <CardDescription>Please enter product details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image */}
              <Label htmlFor="image">Image</Label>
              <Input id="image" type="text" placeholder="Photo URL of the product" className={`w-full ${errors.images ? "border-red-500" : ""}`} value={body.images} onChange={(e) => setBody({ ...body, images: e.target.value })} />
              {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}

              {/* Product Name */}
              <Label htmlFor="product_name" className="mt-4">
                Product Name
              </Label>
              <Input
                id="product_name"
                type="text"
                placeholder="Product Name"
                className={`w-full ${errors.product_name ? "border-red-500" : ""}`}
                value={body.product_name}
                onChange={(e) => setBody({ ...body, product_name: e.target.value })}
              />
              {errors.product_name && <p className="text-red-500 text-sm">{errors.product_name}</p>}

              {/* Price */}
              <Label htmlFor="price" className="mt-4">
                Price
              </Label>
              <Input id="price" type="number" placeholder="Price" className={`w-full ${errors.price ? "border-red-500" : ""}`} value={body.price} onChange={(e) => setBody({ ...body, price: parseFloat(e.target.value) })} />
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

              {/* Stock */}
              <Label htmlFor="stock" className="mt-4">
                Stock
              </Label>
              <Input id="stock" type="number" placeholder="Stock" className={`w-full ${errors.stock ? "border-red-500" : ""}`} value={body.stock} onChange={(e) => setBody({ ...body, stock: parseInt(e.target.value) })} />
              {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}

              {/* City */}
              <Label htmlFor="city" className="mt-4">
                City
              </Label>
              <Input id="city" type="text" placeholder="City" className={`w-full ${errors.city ? "border-red-500" : ""}`} value={body.city} onChange={(e) => setBody({ ...body, city: e.target.value })} />
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}

              {/* Description */}
              <Label htmlFor="description" className="mt-4">
                Description
              </Label>
              <textarea
                id="description"
                placeholder="Description"
                className={`w-full h-32 border border-gray-300 rounded-lg p-2 resize-none focus:ring-2 focus:ring-blue-500 ${errors.description ? "border-red-500" : ""}`}
                value={body.description}
                onChange={(e) => setBody({ ...body, description: e.target.value })}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

             

              {/* Submit Button */}
              <Button type="submit" className="w-full mt-4 active:bg-black">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
