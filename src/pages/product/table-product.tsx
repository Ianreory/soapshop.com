import Layout from "@/components/layout";
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IProduct } from "@/utils/types/product";
import { getUserProduct } from "@/utils/apis/product";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function TableProduct() {
  const [data, setBody] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await getUserProduct();
      if (response.data) {
        setBody(response.data);
      } else {
        setError("No data available");
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price);
  };

  return (
    <Layout>
      <div className=" dark:bg-gray-900">
        <div className="min-h-screen flex flex-col  justify-center">
          <div className="pl-10">
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Link to={"/create/product"}>Tambah Data</Link>
            </Button>
          </div>
          <div className="w-full px-10">
            {/* Display messages based on the state */}
            {loading && <div className="text-center mb-4">Loading...</div>}
            {error && <div className="text-center mb-4 text-red-500">{error}</div>}
            {data.length === 0 && !loading && !error && <div className="text-center mb-4">No products available</div>}

            <Table>
              <TableCaption>A list of your products.</TableCaption>
              <TableHeader className="text-center">
                <TableRow>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((product) => (
                  <TableRow key={product.product_id}>
                    <TableCell>{product.product_id}</TableCell>
                    <TableCell>
                      <img src={product.images} alt={`Product ${product.product_id}`} className="w-16 h-16 object-cover" />
                    </TableCell>
                    <TableCell>{product.product_name}</TableCell>
                    <TableCell>{formatIDR(product.price)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.desciption}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
