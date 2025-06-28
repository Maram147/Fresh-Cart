import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Heart } from 'lucide-react';
import logo from '../../assets/images/freshcart-logo.svg';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
export default function Navbar() {
  const { userLogin, setUserLogin } = useContext(UserContext);
const { cart = {}, WishList = {} } = useContext(CartContext);

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  function logOut() {
    localStorage.removeItem('userToken');
    setUserLogin(null);
    navigate('/login');
  }

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const linkClasses = ({ isActive }) =>
    `block py-2 px-3 rounded-sm md:bg-transparent md:p-0 transition-colors duration-200 ${isActive ? 'text-green-600 font-semibold' : 'text-black hover:text-green-600'
    }`;

  return (
    <nav className="bg-gray-100 w-full z-50 text-center lg:fixed top-0 left-0 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        {/* Logo + Left NavLinks */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="logo" className="h-8" />
          </Link>

          {/* Desktop Only NavLinks */}
          {userLogin && (
            <ul className="hidden md:flex flex-row space-x-6">
              <li><NavLink to="" className={linkClasses}>Home</NavLink></li>
              <li><NavLink to="cart" className={linkClasses}>Cart</NavLink></li>
              <li><NavLink to="products" className={linkClasses}>Products</NavLink></li>
              <li><NavLink to="categories" className={linkClasses}>Categories</NavLink></li>
              <li><NavLink to="brands" className={linkClasses}>Brands</NavLink></li>
            </ul>
          )}
        </div>
        {/* Right side buttons for desktop (Cart + Logout) */}
        {userLogin && (
          <ul className="hidden md:flex items-center space-x-4">
            <li>

              <NavLink to="/wishlist" className="cursor-pointer relative py-2">
                <Heart />
                {WishList?.count > 0 && (
                  <span className="bg-green-600 text-white text-xs px-1 rounded-full absolute -top-2 -right-2">
                    {WishList.count}
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="cursor-pointer relative py-2">
                <i className="fa-solid fa-cart-shopping text-green-600 fa-xl"></i>
                {cart?.numOfCartItems > 0 && (
                  <span className="bg-green-600 text-white text-xs px-1 rounded-full absolute -top-2 -right-2">
                    {cart.numOfCartItems}
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <button
                onClick={logOut}
                className="text-black flex items-center gap-1 justify-center py-2"
              >
                Logout <LogOut size={16} />
              </button>
            </li>

          </ul>
        )}

        {userLogin === null && (
          <ul className="hidden md:flex items-center space-x-4">
            <li><NavLink to="login" className={linkClasses}>Login</NavLink></li>
            <li><NavLink to="register" className={linkClasses}>Register</NavLink></li>
          </ul>
        )}


        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Menu Content for Mobile */}
        <div
          ref={menuRef}
          className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:hidden`}
          id="navbar-default"
        >
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-100 space-y-2">
            {userLogin && (
              <>
                <li><NavLink to="" className={linkClasses}>Home</NavLink></li>
                <li><NavLink to="cart" className={linkClasses}>Cart</NavLink></li>
                <li><NavLink to="products" className={linkClasses}>Products</NavLink></li>
                <li><NavLink to="categories" className={linkClasses}>Categories</NavLink></li>
                <li><NavLink to="brands" className={linkClasses}>Brands</NavLink></li>
              </>
            )}
            {userLogin === null ? (
              <>
                <li><NavLink to="login" className={linkClasses}>Login</NavLink></li>
                <li><NavLink to="register" className={linkClasses}>Register</NavLink></li>
              </>
            ) : (
              <>
                <li>

                  <NavLink to="/wishlist" className="cursor-pointer relative py-2">
                    <Heart />
                    {WishList?.count > 0 && (
                      <span className="bg-green-600 text-white text-xs px-1 rounded-full absolute -top-2 -right-2">
                        {WishList.count}
                      </span>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/cart" className="cursor-pointer relative py-2">
                    <i className="fa-solid fa-cart-shopping text-green-600 fa-xl"></i>
                    {cart?.numOfCartItems > 0 && (
                      <span className="bg-green-600 text-white text-xs px-1 rounded-full absolute -top-2 -right-2">
                        {cart.numOfCartItems}
                      </span>
                    )}
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={logOut}
                    className="text-black flex items-center gap-1 justify-center w-full py-2"
                  >
                    Logout <LogOut size={16} />
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>

  );
}
