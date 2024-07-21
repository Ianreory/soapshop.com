import Product from "@/components/cart-product";
import HomePage from "@/components/home";
import Layout from "@/components/layout";
import { getProducts } from "@/utils/apis/product";
import { IProduct } from "@/utils/types/product";
import { useEffect, useState } from "react";


export default function Home() {
  const [data, setBody] = useState<IProduct[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await getProducts();
      setBody(response.data);
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center dark:bg-gray-900">
        <HomePage />
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((product) => (
            <Product key={product.id} navigate={`/product/${product.id}`} data={product}  />
          ))}
        </div>
      </div>
    </Layout>
  );
}
