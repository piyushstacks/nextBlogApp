import Image from "next/image";
import { ToastContainer } from "react-toastify";
import Slidebar from "@/components/AdminComponents/Slidebar";
import { assets } from "@/assets/assets";
export default function AdminLayout({ children }) {
  return (
    <>
      <ToastContainer theme="dark" />
      <div className="flex min-h-screen">
        <Slidebar />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
            <h3 className="font-medium pl-10">Admin Panel</h3>
            <Image src={assets.profile_icon} alt="" width={40} />
          </div>
          <div className="flex-grow px-2 pb-2">{children}</div>
          <footer className="mt-10 p-4 border-t border-black text-center">
            © {new Date().getFullYear()} Blogger Admin
          </footer>
        </div>
      </div>
      </> 
  );
}
