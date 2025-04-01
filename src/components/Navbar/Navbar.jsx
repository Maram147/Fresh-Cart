import React, { useContext } from 'react'
import Style from './Navbar.module.css'
import { useState } from 'react'
import { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg'
import Cart from '../Cart/Cart';
import { CounterContext } from '../../Context/CounterContext';
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  let navigate = useNavigate()
  let { cart } = useContext(CartContext);

  function logOut() {
    localStorage.removeItem('userToken')
    setUserLogin = (null)
    navigate('/login')
  }


  useEffect(() => {
    <img src={logo} alt="logo" className='h-8' />


  }, []);
  return <>
    <nav className="bg-gray-100 w-full z-50 text-center lg:fixed top-0 left-0 right-0 border-gray-200 ">
      <div className="max-w-screen-xl flex  flex-wrap items-center justify-between md:justify-start mx-auto p-4">
        <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse  md:w-[20%]">
          <img src={logo} alt="logo" className='h-8' />

        </Link>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className="hidden w-full md:flex md:w-[80%] md:justify-between" id="navbar-default">

          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray">
            {userLogin !== null ? <>
              <li>
                <NavLink to='' className="block py-2 px-3 text-white  rounded-sm md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">Home</NavLink>
              </li>
              <li>
                <NavLink to='cart' className="block py-2 px-3 text-white  rounded-sm md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">Cart</NavLink>
              </li>
              <li>
                <NavLink to='products' className="block py-2 px-3 text-white  rounded-sm md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">Products</NavLink>
              </li>
              <li>
                <NavLink to='categories' className="block py-2 px-3 text-white  rounded-sm md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">Categories</NavLink>
              </li>
              <li>
                <NavLink to='brands' className="block py-2 px-3 text-white  rounded-sm md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">Brands</NavLink>
              </li>

            </> : null

            }
          </ul>
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray">
            {userLogin === null ?
              <>
                <li>
                  <NavLink to='login' className="block py-2 px-3 text-white  rounded-sm md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">Login</NavLink>
                </li>
                <li>
                  <NavLink to='register' className="block py-2 px-3 text-white  rounded-sm md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">Register</NavLink>
                </li>

              </> :
              <>
                <li >
                <NavLink to={'/cart'} className="cursor-pointer  py-4 mx-2 text-white relative" aria-current="page">
                <i className="fa-solid fa-cart-shopping text-green-600 fa-2xl"></i>
                <span className='bg-green-600 text-white px-2 p-1 text-sm absolute top-0 right-[-5px] rounded-2xl'>{cart?.numOfCartItems}</span>

                </NavLink>

                </li>

                <li onClick={logOut}>
                  <NavLink to="logout" className="cursor-pointer block py-2 px-3 text-white  rounded-sm md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">Logout</NavLink>
                </li>
              </>

            }
          </ul>
        </div>
      </div>
    </nav>




  </>


}
