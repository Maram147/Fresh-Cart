import { createContext, useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Products from './components/Products/Products'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Notfound from './components/Notfound/Notfound'
import 'flowbite'
import UserContextProvider, { UserContext } from './Context/UserContext'
import CounterContextProvider from './Context/CounterContext'
import Navbar from './components/Navbar/Navbar'
import ProtectRoute from './components/ProtectRoute/ProtectRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContaxtProvider from './Context/CartContext'
import toast, { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout'
import Orders from './components/Orders/Orders'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import { Offline, Online } from "react-detect-offline";
import OfflinePage from './components/OfflinePage/OfflinePage'
import useOnlineStatus from './components/useOnlineStatus/useOnlineStatus';
import WishList from './components/WishList/WishList'
import Profile from './components/Profile/Profile'
import CategoriesDetails from './components/CategoriesDetails/CategoriesDetails'
import BrandsDetails from './components/BrandsDetails/BrandsDetails'
let query = new QueryClient();
let router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: 'cart', element: <ProtectRoute><Cart /></ProtectRoute> },
      { path: 'wishlist', element: <ProtectRoute><WishList /></ProtectRoute> },
      { path: 'profile', element: <ProtectRoute><Profile /></ProtectRoute> },
      { path: 'products', element: <Products /> },
      { path: 'productdetails/:id/:category', element: <ProductDetails /> },
      { path: 'checkout', element: <ProtectRoute><Checkout /></ProtectRoute> },
      { path: 'allorders', element: <ProtectRoute><Orders /></ProtectRoute> },
      { path: 'forgetpassword', element: <ProtectRoute><ForgetPassword /></ProtectRoute> },

      { path: 'categories', element: <Categories /> },
      { path: 'categoriesdetails/:id', element: <CategoriesDetails /> },

      { path: 'brands', element: <Brands /> },
      { path: 'brandsdetails/:id', element: <BrandsDetails /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Notfound /> }



    ]
  }
])
function App() {
  const isOnline = useOnlineStatus();

  return (<>
    <UserContextProvider>

      <CartContaxtProvider>
        <QueryClientProvider client={query}>


          <CounterContextProvider>
            <RouterProvider router={router}></RouterProvider>
            <Toaster />
            <ReactQueryDevtools />
          </CounterContextProvider>
        </QueryClientProvider>
      </CartContaxtProvider>

    </UserContextProvider>

    {/* <Offline>
        <div className="network rounded-3">
          <i className="fas fa-wifi mx-3"></i>
          you are offline
        </div>
        <OfflinePage />
      </Offline> */}
    {!isOnline && (
      <div className="network fixed bottom-4 left-4 bg-red-500 text-white px-4 py-2 z-50 rounded">
        <i className="fas fa-wifi mx-2"></i> You are offline
        <OfflinePage />
      </div>
    )}
  </>
  )


}

export default App
