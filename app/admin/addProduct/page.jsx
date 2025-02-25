"use client";
import { assets } from '@/assets/assets';
import Image from 'next/image';
import React, {useState} from 'react'

const page = () => {

    const [image,setImage] = useState(false);

  return (
    <>
    <form action="" className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        <p className='text-xl'>Upload Thumbnail</p>
        <label htmlFor="image">
            <Image className='mt-4' src={!image?assets.upload_area:URL.createObjectURL(image)} width={140} height={70} alt=''/>
        </label>
        <input onChange={(e)=>{
            setImage(e.target.files[0])
        }} type="file" id='image' hidden required/>
    </form>
    </>
  )
}

export default page
