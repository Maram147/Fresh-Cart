import React, { useContext, useState, useEffect } from 'react'
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

export default function Cart() {
  const [cartDetails, setcartDetails] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { getCartItem, removeCartItem, updateCartItem, setCart } = useContext(CartContext);

  async function getCart() {
    const response = await getCartItem();
    setcartDetails(response.data);
  }

  async function confirmRemove() {
    if (deleteId) {
      const response = await removeCartItem(deleteId);
      setcartDetails(response.data);
      setCart(response.data);
      setShowConfirm(false);
      setDeleteId(null);
    }
  }

  async function updateQuantity(productId, count) {
    if (count < 1) {
      setDeleteId(productId);
      setShowConfirm(true);
      return;
    }
    const response = await updateCartItem(productId, count);
    setcartDetails(response.data);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

        <Link to="/checkout">
          <button className="w-full md:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md mb-6">
            CheckOut Now
          </button>
        </Link>

        {/* Table View for md and up */}
        <table className="hidden md:table w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartDetails?.data.products.map(product => (
              <tr key={product.product.id} className="bg-white border-b hover:bg-gray-50">
                <td className="p-4">
                  <img src={product.product.imageCover} className="w-16 md:w-32 rounded" alt="Product" />
                </td>
                <td className="px-4 py-4 font-semibold text-gray-900">{product.product.title}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(product.product.id, product.count - 1)}
                      className="inline-flex items-center justify-center p-1 me-2 text-sm h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M1 1h16" />
                      </svg>
                    </button>
                    <span className="text-sm">{product.count}</span>
                    <button
                      onClick={() => updateQuantity(product.product.id, product.count + 1)}
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-4 py-4 font-semibold text-gray-900">{product.price} EGP</td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => { setDeleteId(product.product.id); setShowConfirm(true); }}
                    className="text-red-600 hover:text-red-400 font-medium flex items-center gap-1 p-2 rounded-md"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {cartDetails?.data.products.map(product => (
            <div key={product.product.id} className="bg-white shadow p-4 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <img src={product.product.imageCover} alt={product.product.title} className="w-20 h-20 object-cover rounded" />
                <div>
                  <h3 className="font-semibold text-gray-800">{product.product.title}</h3>
                  <p className="text-sm text-gray-600">{product.price} EGP</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(product.product.id, product.count - 1)}
                    className="p-1 text-sm h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>
                  <span className="text-sm mx-2">{product.count}</span>
                  <button
                    onClick={() => updateQuantity(product.product.id, product.count + 1)}
                    className="p-1 text-sm h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={() => { setDeleteId(product.product.id); setShowConfirm(true); }}
                  className="text-red-600 hover:text-red-400 text-sm flex items-center gap-1"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <svg className="mx-auto mb-4 text-red-500 w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Are you sure you want to delete this item?</h2>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded">No</button>
              <button onClick={confirmRemove} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded">Yes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
