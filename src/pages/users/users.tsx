import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/utils/apis/users";
import { IUser } from "@/utils/types/users";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Users() {
  const [data, setData] = useState<IUser>();

  React.useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await getProfile();
      setData(response.data);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
  return (
    <Layout>
      <section className="pt-16 bg-blueGray-50 border-b border-blueGray-200">
        <div className="w-full lg:w-5/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-[#1E293B] w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="flex justify-center items-center">
                    <img
                      // images
                      src={data?.images.length !== 0 ? data?.images : "/public/photo.png"}
                      alt=""
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-100-px"
                      width={280}
                    />
                    {/* <img alt="..." src="/public/photo.png" className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" /> */}
                  </div>
                </div>
                <div className="w-full px-4 text-center mt-20">
                  <div className="flex justify-center py-2 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span>
                      <span className="text-sm text-blueGray-400">Order</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-1">
                {/* username */}
                <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">{data?.username}</h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  {/* address */}
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {data?.address}
                </div>
                <div className="pb-4">
                  <Button className="bg-blue-900 active:bg-blue-950 ">
                    <Link to="/profile/edit">Edit Profile</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
