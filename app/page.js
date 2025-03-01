'use client'
import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col"> 
    <ToastContainer theme="dark"/>
      <Header/>
      <main className="flex-grow"> {/* Expands to push footer down */}
        <BlogList/>
      </main>
      <Footer/>
    </div>
  );
}
