import { createContext, useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";

export let UserContext=createContext(0);
export default function UserContextProvider(props)
{
   const [userLogin,setUserLogin]=useState(null);
   useEffect(()=>{
    if(localStorage.getItem('userToken')!==null){
        setUserLogin(localStorage.getItem('userToken'))
    }

   },[]);
    return(<>
    
    <UserContext.Provider value={{userLogin,setUserLogin}}>
    {props.children}
   
</UserContext.Provider>
</>)
}