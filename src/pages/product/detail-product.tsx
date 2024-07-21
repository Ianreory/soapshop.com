import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "@/components/layout";

import { Badge } from "@/components/ui/badge";
import { IProduct } from "@/utils/types/product";
import { getDetailProduct } from "@/utils/apis/product";

export default function DetailProduct() {
  const [data, setData] = useState<IProduct>();
  const { product_id } = useParams<{ product_id: string }>();

  useEffect(() => {
    fetchData();
  }, [product_id]); // Menambahkan `product_id` sebagai dependensi

  async function fetchData() {
    if (!product_id) return; // Menghindari kesalahan jika `product_id` tidak ada
    try {
      const response = await getDetailProduct(+product_id); // Menggunakan `product_id` dari URL
      setData(response.data);
    } catch (error) {
      alert(error);
    }
  }
  function formatIDR(value: number): string {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value);
  }
  return (
    <Layout>
      <div className="flex justify-center pt-24 min-w-full ">
        <a href="#" className="flex flex-col items-center bg-[#1E293B] border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={data?.images} alt={data?.product_name} />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data?.product_name}</h5>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{formatIDR(data?.price || 0)}</h5> {/* Format price to IDR */}
            <Badge className="py-1 w-36 justify-center">{data?.city}</Badge>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data?.description}</p>
          </div>
        </a>
      </div>
    </Layout>
  );
}
