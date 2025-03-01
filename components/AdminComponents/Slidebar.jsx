"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/assets/assets";
import { IoMdClose, IoMdMenu } from "react-icons/io";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 h-full w-64 bg-slate-100 shadow-lg transition-transform duration-300 ease-in-out z-50 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <Image src={assets.logo} alt="Logo" width={100} />
          {/* Close button (Only on small screens) */}
          <button onClick={() => setIsOpen(false)} className="md:hidden">
            <IoMdClose size={30} />
          </button>
        </div>

        <nav className="flex flex-col p-6 gap-4 text-lg font-medium">
          <Link href="/admin/addProduct" className="flex items-center gap-3">
            <Image src={assets.add_icon} alt="Add" width={24} /> Add Blogs
          </Link>
          <Link href="/admin/blogList" className="flex items-center gap-3">
            <Image src={assets.blog_icon} alt="Blogs" width={24} /> Blog Details
          </Link>
          <Link href="/admin/subscriptions" className="flex items-center gap-3">
            <Image src={assets.email_icon} alt="Subscriptions" width={24} /> Subscriptions
          </Link>
        </nav>
      </div>
      <button
          className="md:hidden fixed top-4 left-4 bg-white p-2 rounded shadow-md"
          onClick={() => setIsOpen(true)}
        >
        <IoMdMenu size={30} />
      </button>

      {/* Overlay (Only on small screens when sidebar is open) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
