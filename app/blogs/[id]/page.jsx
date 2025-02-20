import React, { useEffect } from 'react'

const page = ({params}) => {

    const page = ({params}) => {
        const [data, setData] = useState(null);
        const fetchBlogData = () => {
            
        }
        useEffect(()=>{
fetchBlogData();
        },[])
    }
  return (
    <div>
      {params.id}
    </div>
  )
}

export default page