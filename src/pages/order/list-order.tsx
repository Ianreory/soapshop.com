import Layout from "@/components/layout";
import  { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IProduct } from "@/utils/types/product";
import { getUserProduct } from "@/utils/apis/product";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ListOrder() {
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
              <TableCaption>A list of your Order.</TableCaption>
              <TableHeader className="text-center">
                <TableRow>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map(() => (
                  <TableRow >
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
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
