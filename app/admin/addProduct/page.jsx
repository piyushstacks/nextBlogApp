// "use client";
// import { assets } from '@/assets/assets';
// import Image from 'next/image';
// import React, { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const page = () => {
//     const [image, setImage] = useState(null);
//     const [data, setData] = useState({
//         title: "",
//         description: "",
//         category: "Startup",
//         author: "Alex Herbo",
//         authorImg: "/author_img.png"
//     });

//     const onSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const formData = new FormData();
//             formData.append('title', data.title);
//             formData.append('description', data.description);
//             formData.append('category', data.category);
//             formData.append('author', data.author);
//             formData.append('authorImg', data.authorImg);
//             if (image) {
//                 formData.append('image', image);
//             }

//             const response = await axios.post('/api/blog', formData);
//             if (response.data.success) {
//                 toast.success(response.data.msg);
//                 setData({
//                     title: "",
//                     description: "",
//                     category: "Startup",
//                     author: "Alex Herbo",
//                     authorImg: "/author_img.png"
//                 });
//                 setImage(null);
//             } else {
//                 toast.error("Error");
//             }
//         } catch (error) {
//             toast.error("Something went wrong!");
//         }
//     };

//     const onChangeHandler = (event) => {
//         const { name, value } = event.target;
//         setData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     return (
//         <>
//             <form onSubmit={onSubmit} className="pt-5 px-5 sm:pt-12 sm:pl-16">
//                 <p className="text-xl">Upload Thumbnail</p>
//                 <label htmlFor="image">
//                     <Image 
//                         className="mt-4" 
//                         src={image ? URL.createObjectURL(image) : assets.upload_area} 
//                         width={140} 
//                         height={70} 
//                         alt="Upload Thumbnail"
//                     />
//                 </label>
//                 <input 
//                     onChange={(e) => setImage(e.target.files[0])} 
//                     type="file" 
//                     id="image" 
//                     hidden 
//                     required
//                 />
                
//                 <p className="text-xl mt-4">Blog Title</p>
//                 <input 
//                     name="title" 
//                     onChange={onChangeHandler} 
//                     value={data.title} 
//                     className="w-full sm:w-[500px] mt-4 px-4 py-3 border" 
//                     type="text" 
//                     placeholder="Type here" 
//                     required 
//                 />

//                 <p className="text-xl mt-4">Blog Description</p>
//                 <textarea 
//                     name="description" 
//                     onChange={onChangeHandler} 
//                     value={data.description} 
//                     className="w-full sm:w-[500px] mt-4 px-4 py-3 border" 
//                     placeholder="Write content here" 
//                     required 
//                 />

//                 <p className="text-xl mt-4">Blog Category</p>
//                 <select 
//                     name="category" 
//                     onChange={onChangeHandler} 
//                     value={data.category} 
//                     className="w-40 mt-4 py-3 border text-gray-500"
//                 >
//                     <option value="Startup">Startup</option>
//                     <option value="Technology">Technology</option>
//                     <option value="Lifestyle">Lifestyle</option>
//                 </select>
                
//                 <br />
//                 <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">ADD</button>
//             </form>

//             <ToastContainer />
//         </>
//     );
// };

// export default page;


"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import React, { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [image, setImage] = useState(null);
  const textareaRef = useRef(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Herbo",
    authorImg: "/author_img.png",
  });

  const formatText = (tag, param = null) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    let formattedText = '';
    
    switch(tag) {
      case 'bold':
        formattedText = `<strong>${selectedText}</strong>`;
        break;
      case 'italic':
        formattedText = `<em>${selectedText}</em>`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
      case 'strike':
        formattedText = `<strike>${selectedText}</strike>`;
        break;
      case 'h1':
        formattedText = `<h1>${selectedText}</h1>`;
        break;
      case 'h2':
        formattedText = `<h2>${selectedText}</h2>`;
        break;
      case 'h3':
        formattedText = `<h3>${selectedText}</h3>`;
        break;
      case 'p':
        formattedText = `<p>${selectedText}</p>`;
        break;
      case 'blockquote':
        formattedText = `<blockquote>${selectedText}</blockquote>`;
        break;
      case 'color':
        formattedText = `<span style="color:${param}">${selectedText}</span>`;
        break;
      case 'align':
        formattedText = `<div style="text-align:${param}">${selectedText}</div>`;
        break;
      case 'ul':
        // Split selected text by new lines
        if (selectedText.includes('\n')) {
          const lines = selectedText.split('\n').filter(line => line.trim() !== '');
          const listItems = lines.map(line => `  <li>${line}</li>`).join('\n');
          formattedText = `<ul>\n${listItems}\n</ul>`;
        } else {
          formattedText = `<ul>\n  <li>${selectedText}</li>\n</ul>`;
        }
        break;
      case 'ol':
        if (selectedText.includes('\n')) {
          const lines = selectedText.split('\n').filter(line => line.trim() !== '');
          const listItems = lines.map(line => `  <li>${line}</li>`).join('\n');
          formattedText = `<ol>\n${listItems}\n</ol>`;
        } else {
          formattedText = `<ol>\n  <li>${selectedText}</li>\n</ol>`;
        }
        break;
      case 'link':
        const url = prompt('Enter URL:', 'https://');
        if (url) {
          formattedText = `<a href="${url}" target="_blank">${selectedText || url}</a>`;
        } else {
          formattedText = selectedText;
        }
        break;
      case 'image':
        const imgUrl = prompt('Enter image URL:', 'https://');
        if (imgUrl) {
          formattedText = `<img src="${imgUrl}" alt="${selectedText || 'Image'}" style="max-width:100%;" />`;
        } else {
          formattedText = selectedText;
        }
        break;
      case 'code':
        formattedText = `<code>${selectedText}</code>`;
        break;
      case 'pre':
        formattedText = `<pre>${selectedText}</pre>`;
        break;
      case 'hr':
        formattedText = `\n<hr />\n`;
        break;
      case 'table':
        formattedText = `<table border="1" cellpadding="4">
  <tr>
    <th>Header 1</th>
    <th>Header 2</th>
  </tr>
  <tr>
    <td>Row 1, Cell 1</td>
    <td>Row 1, Cell 2</td>
  </tr>
  <tr>
    <td>Row 2, Cell 1</td>
    <td>Row 2, Cell 2</td>
  </tr>
</table>`;
        break;
      default:
        formattedText = selectedText;
    }
    
    const newValue = 
      textarea.value.substring(0, start) + 
      formattedText + 
      textarea.value.substring(end);
    
    setData(prevData => ({ ...prevData, description: newValue }));
    
    // Reset cursor position after state update
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + formattedText.length;
      textarea.selectionStart = newPosition;
      textarea.selectionEnd = newPosition;
    }, 0);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("author", data.author);
      formData.append("authorImg", data.authorImg);
      if (image) {
        formData.append("image", image);
      }
      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Alex Herbo",
          authorImg: "/author_img.png",
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
        <div className="w-full sm:w-[500px] mt-4 border rounded">
          {/* Text formatting toolbar */}
          <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
            <button type="button" onClick={() => formatText('bold')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100" title="Bold">B</button>
            <button type="button" onClick={() => formatText('italic')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100 italic" title="Italic">I</button>
            <button type="button" onClick={() => formatText('underline')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100 underline" title="Underline">U</button>
            <button type="button" onClick={() => formatText('strike')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100 line-through" title="Strike">S</button>
            <span className="mx-1 text-gray-300">|</span>
            
            {/* Headings */}
            <button type="button" onClick={() => formatText('h1')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100" title="Heading 1">H1</button>
            <button type="button" onClick={() => formatText('h2')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100" title="Heading 2">H2</button>
            <button type="button" onClick={() => formatText('h3')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100" title="Heading 3">H3</button>
            <button type="button" onClick={() => formatText('p')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100" title="Paragraph">P</button>
            <span className="mx-1 text-gray-300">|</span>
            
            {/* Lists */}
            <button type="button" onClick={() => formatText('ul')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100" title="Bullet List">•</button>
            <button type="button" onClick={() => formatText('ol')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100" title="Numbered List">1.</button>
            <span className="mx-1 text-gray-300">|</span>
            
            {/* Alignment */}
            <button type="button" onClick={() => formatText('align', 'left')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100" title="Align Left">←</button>
            <button type="button" onClick={() => formatText('align', 'center')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100" title="Align Center">↔</button>
            <button type="button" onClick={() => formatText('align', 'right')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100" title="Align Right">→</button>
            <span className="mx-1 text-gray-300">|</span>
            
            {/* Colors */}
            <button type="button" onClick={() => formatText('color', 'red')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100" style={{color: 'red'}} title="Red Text">A</button>
            <button type="button" onClick={() => formatText('color', 'blue')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100" style={{color: 'blue'}} title="Blue Text">A</button>
            <button type="button" onClick={() => formatText('color', 'green')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100" style={{color: 'green'}} title="Green Text">A</button>
            <span className="mx-1 text-gray-300">|</span>
            
            {/* Other elements */}
            <button type="button" onClick={() => formatText('blockquote')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100" title="Blockquote">"</button>
            <button type="button" onClick={() => formatText('code')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100 font-mono" title="Inline Code">&lt;/&gt;</button>
            <button type="button" onClick={() => formatText('pre')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100 font-mono" title="Code Block">{ }{ }</button>
            <button type="button" onClick={() => formatText('link')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100" title="Insert Link">🔗</button>
            <button type="button" onClick={() => formatText('image')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100" title="Insert Image">🖼️</button>
            <button type="button" onClick={() => formatText('hr')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100" title="Horizontal Line">―</button>
            <button type="button" onClick={() => formatText('table')} className="px-2 py-1 bg-white rounded border hover:bg-gray-100" title="Insert Table">📊</button>
          </div>
          
          {/* Text area */}
          <textarea
            ref={textareaRef}
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            className="w-full p-4 min-h-48 outline-none resize-y font-mono text-sm"
            placeholder="Write your blog content here using HTML formatting..."
            required
          />
        </div>
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
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
          ADD
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default Page;