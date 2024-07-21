import { IProduct } from "@/utils/types/product";

import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { CartSchema } from "@/utils/types/carts";
import { useEffect, useState } from "react";
import { createCart } from "@/utils/apis/carts";

interface Props {
  data: IProduct;
  navigate: string;
  "data-testid"?: string;
}

export default function Product(props: Props) {
  const { data } = props;
  const formatIDR = (price: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price);
  };
  const [count, setCart] = useState<CartSchema>({
    product_id: 0,
    quantity: 0,
  });

  useEffect(() => {
    setCart({
      product_id: data.product_id,
      quantity: 1,
    });
  }, []);

  const handleCart = async () => {
    try {
      const response = await createCart(count);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <>
      <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow bg-[#1F2937] dark:bg-gray-800 dark:border-gray-700">
        <Link to={`/product/${data.product_id}`} data-testid={props["data-testid"]}>
          <img className="p-8 rounded-t-lg w-full h-52 object-cover" src={data.images} alt="product image" />
        </Link>
        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-white text-gray-900 dark:text-white">{data.product_name}</h5>

          <div className="flex items-center mt-2.5 mb-5">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">Tersisa {data.stock}</span>
          </div>
          <div>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Kota {data.city}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-white">{formatIDR(data.price)}</span>

            <Button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onChange={(e) => setCart({ ...count, product_id: data.product_id, quantity: Number(e.target.value) })}
              onClick={handleCart}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
