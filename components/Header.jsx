"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { assets } from '@/assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Header = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [topicIndex, setTopicIndex] = useState(0);
  const [fadeState, setFadeState] = useState("in");
  
  // Topics to cycle through
  const topics = [
    "Web Development",
    "Technology",
    "Lifestyle",
    "Programming",
    "Design",
    "AI & Machine Learning"
  ];

  // Animation effect for changing topics
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Start fade out
      setFadeState("out");
      
      // After fade out completes, change topic and fade in
      setTimeout(() => {
        setTopicIndex((prevIndex) => (prevIndex + 1) % topics.length);
        setFadeState("in");
      }, 500); // Match this with the CSS transition duration
      
    }, 3000); // Change topic every 3 seconds
    
    return () => clearInterval(intervalId);
  }, [topics.length]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("email", email);
  
      const response = await axios.post("/api/email", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail("");
      } else {
        toast.error("Error submitting email.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Email submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <header className="py-6 px-5 md:px-12 lg:px-28">
      {/* Navigation Bar */}
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image 
            src={assets.logo} 
            width={180} 
            alt="Blog Logo" 
            className="w-[130px] sm:w-[180px] md:w-[200px] lg:w-[230px]"
          />
        </Link>

        <Link href="/sign-in" className="flex items-center gap-2 font-medium py-2 px-4 sm:py-3 sm:px-6 border-black border border-solid shadow-[-4px_4px_0px_#000000] hover:shadow-[-2px_2px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-white">
          Get Started 
          <Image src={assets.arrow} alt="Arrow Icon" width={16} height={16} />
        </Link>
      </div>

      {/* Hero Section */}
      <div className="text-center my-12 md:my-16">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
          Discover Insights in{" "}
          <span 
            className={`text-indigo-600 inline-block min-w-[280px] sm:min-w-[400px] transition-opacity duration-500 ${fadeState === "out" ? "opacity-0" : "opacity-100"}`}
          >
            {topics[topicIndex]}
          </span>
        </h1>
        
        <p className="mt-6 max-w-[740px] mx-auto text-sm sm:text-base text-gray-600">
          Stay updated with the latest trends, tutorials, and best practices across various fields.
          Join our community and level up your skills with curated content delivered to your inbox.
        </p>

        {/* Email Subscription Form */}
        <div className="mt-10 max-w-[600px] mx-auto">
          <form 
            className="flex flex-col sm:flex-row justify-between mx-auto border border-black rounded-md overflow-hidden shadow-[-5px_5px_0px_#000000]" 
            onSubmit={onSubmitHandler}
          >
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              type="email" 
              placeholder="Enter your email for weekly updates" 
              className="pl-4 py-3 outline-none w-full bg-white"
              required
            />
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`border-t sm:border-t-0 sm:border-l border-black py-3 px-6 font-medium bg-black text-white hover:bg-gray-800 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-3">
            Join 5,000+ readers receiving our weekly insights. Unsubscribe anytime.
          </p>
        </div>
        
        {/* Tags/Categories */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">JavaScript</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">Technology</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">Lifestyle</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">Design</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">AI & ML</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
