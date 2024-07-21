import { useLoaderData } from "react-router-dom";

import Navbar from "@/components/navbar";
import useTitle from "@/utils/hooks/use-title";
import Footer from "./footer";

interface Props {
  children: React.ReactNode;
}

const Layout = (props: Props) => {
  const loaderData = useLoaderData() as string;
  useTitle(loaderData);

  return (
    <div className=" bg-[#0F172A] h-dvh w-full  overflow-auto">
      <Navbar />
      <div className="container h-full overflow-auto flex flex-col mx-auto">
        <div className="w-full flex-1 flex flex-col relative">{props.children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
