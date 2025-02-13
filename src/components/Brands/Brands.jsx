import React from 'react'
import Style from './Brands.module.css'
import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';

export default function Brands() {
  const [brands, setBrands] = useState([])
  const getAllBrands = async () => {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    setBrands(data.data)
  }
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    getAllBrands();

  }, []);


  return <>
    <div className="container">
      <div className="row">
        
        {brands.map((item)=>
          <div key={item._id} className="col-md-3 mt-3">
            <div className='product brand mx-2 pb-5'>
              <img src={item.image} className='w-full' alt="" />
              <h6 className='text-main text-center fw-bolder'>{item.name}</h6>
            </div>

          </div>)}

          </div>
        
    </div>

  </>


}
