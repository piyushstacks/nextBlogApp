"use client";
import { assets } from '@/assets/assets';
import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Startup",
        author: "Alex Herbo",
        authorImg: "/author_img.png"
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('category', data.category);
            formData.append('author', data.author);
            formData.append('authorImg', data.authorImg);
            if (image) {
                formData.append('image', image);
            }

            const response = await axios.post('/api/blog', formData);
            if (response.data.success) {
                toast.success(response.data.msg);
                setData({
                    title: "",
                    description: "",
                    category: "Startup",
                    author: "Alex Herbo",
                    authorImg: "/author_img.png"
                });
                setImage(null);
            } else {
                toast.error("Error");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <>
            <form onSubmit={onSubmit} className="pt-5 px-5 sm:pt-12 sm:pl-16">
                <p className="text-xl">Upload Thumbnail</p>
                <label htmlFor="image">
                    <Image 
                        className="mt-4" 
                        src={image ? URL.createObjectURL(image) : assets.upload_area} 
                        width={140} 
                        height={70} 
                        alt="Upload Thumbnail"
                    />
                </label>
                <input 
                    onChange={(e) => setImage(e.target.files[0])} 
                    type="file" 
                    id="image" 
                    hidden 
                    required
                />
                
                <p className="text-xl mt-4">Blog Title</p>
                <input 
                    name="title" 
                    onChange={onChangeHandler} 
                    value={data.title} 
                    className="w-full sm:w-[500px] mt-4 px-4 py-3 border" 
                    type="text" 
                    placeholder="Type here" 
                    required 
                />

                <p className="text-xl mt-4">Blog Description</p>
                <textarea 
                    name="description" 
                    onChange={onChangeHandler} 
                    value={data.description} 
                    className="w-full sm:w-[500px] mt-4 px-4 py-3 border" 
                    placeholder="Write content here" 
                    required 
                />

                <p className="text-xl mt-4">Blog Category</p>
                <select 
                    name="category" 
                    onChange={onChangeHandler} 
                    value={data.category} 
                    className="w-40 mt-4 py-3 border text-gray-500"
                >
                    <option value="Startup">Startup</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>
                
                <br />
                <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">ADD</button>
            </form>

            <ToastContainer />
        </>
    );
};

export default page;
