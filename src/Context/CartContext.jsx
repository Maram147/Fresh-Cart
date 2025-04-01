import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
export let CartContext=createContext(0);
export default function CartContaxtProvider(props)
{
    let headers={
        token:localStorage.getItem('userToken')
    }
let [cart,setCart]=useState(0);
    function getCartItem(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:
                {token:localStorage.getItem("userToken")}
                
        })
         .then((response)=>response)
        .catch((err)=>err)
    }

    function addToCart(productId)
    {
       return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
            productId
        },{
            headers:
                {token:localStorage.getItem("userToken")}
                
        })
        .then((response)=>response)
        .catch((err)=>err)
    }
    function removeCartItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers:
                {token:localStorage.getItem("userToken")}
                
        })
         .then((response)=>response)
        .catch((err)=>err)
    }
    function updateCartItem(productId,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            count
        },{
            headers:
                {token:localStorage.getItem("userToken")}
                
        })
         .then((response)=>response)
        .catch((err)=>err)
    }
    async function getCart(){
     let response=await getCartItem();
     setCart(response.data);

    }

    function checkOut(cartId,url,formValue){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
            shippingAddress:formValue
           
        },{
            headers:
                {token:localStorage.getItem("userToken")}
                
        })
         .then((response)=>response)
        .catch((err)=>err)
    }
    useEffect(()=>{
getCart();
    },[]);

    return <CartContext.Provider value={{checkOut,cart,setCart,addToCart,getCartItem,removeCartItem,updateCartItem}}>
{props.children}
    </CartContext.Provider>
}