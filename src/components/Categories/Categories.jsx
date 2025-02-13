import React from 'react'
import Style from './Categories.module.css'
import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';

export default function Categories() {
  const [categories, setCategories] = useState([])
  const getAllCategories = async () => {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    setCategories(data.data)
  }
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    getAllCategories();

  }, []);


  return <>
    <div className="container">
      <div className="row flex category">
          {categories?.map((item)=>{
    return <div className=' product brand col-md-4 mt-4' key={item._id}> 
      <img src={item.image} className=' w-100 h-[300px]'   alt={item.name}  />
      <h6 className=' text-main text-center my-4 fw-bolder'>{item.name}</h6>
    
    </div>

  })}

          </div>
        
    </div>

  </>


}
