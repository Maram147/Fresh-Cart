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
// import UserContextProvider from './Context/CounterContext'
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
let query = new QueryClient();
let router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectRoute><Home /></ProtectRoute> },
      { path: 'cart', element: <ProtectRoute><Cart /></ProtectRoute> },
      { path: 'products', element: <ProtectRoute><Products /></ProtectRoute> },
      { path: 'productdetails/:id/:category', element: <ProtectRoute><ProductDetails /></ProtectRoute> },
      { path: 'checkout', element: <ProtectRoute><Checkout/></ProtectRoute> },
      { path: 'allorders', element: <ProtectRoute><Orders/></ProtectRoute> },
      { path: 'forgetpassword', element: <ProtectRoute><ForgetPassword/></ProtectRoute> },

      { path: 'categories', element: <ProtectRoute><Categories /></ProtectRoute> },
      { path: 'brands', element: <ProtectRoute><Brands /></ProtectRoute> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Notfound /> }



    ]
  }
])
function App() {
  const [count, setCount] = useState(0)


  return (<> <CartContaxtProvider>
  <QueryClientProvider client={query}>
    <UserContextProvider>
      <CounterContextProvider>
        <RouterProvider router={router}></RouterProvider>
        <Toaster/>
<ReactQueryDevtools/>
      </CounterContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
  </CartContaxtProvider>
  </>
  )


}

export default App
