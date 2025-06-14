import React from 'react'
import amazon from '../../assets/images/Amazon-Pay-logo.svg'
import american from '../../assets/images/american-express.svg'
import masterCard from '../../assets/images/mastercard.svg'
import paypal from '../../assets/images/paypal.svg'
import visa from '../../assets/images/visa.svg'
import appstore from '../../assets/images/appstore-btn.svg'
import googleplay from '../../assets/images/googleplay-btn.svg'

export default function Footer() {
  return (
   <footer className="bg-[#f5f7f6] mt-auto py-10 px-4 w-full">
  <div className="max-w-7xl mx-auto">
    {/* Title & Subtitle */}
    <div className="text-center mb-6">
      <h2 className="text-3xl font-semibold text-gray-900">Get the freshCart app</h2>
      <p className="text-gray-600 mt-2">
        We will send you a link, open it on your phone to download the app
      </p>
    </div>

    {/* Input + Button */}
    <form className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
      <input
        type="email"
        placeholder="Enter Email Address"
        className="w-full md:w-[500px] px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        type="submit"
        className="w-full md:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
      >
        Share App Link
      </button>
    </form>

    <hr className="border-gray-300 mb-6" />

    {/* Payment + App Stores */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 flex-wrap">
      {/* Payment Partners */}
      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-gray-800 font-semibold">Payment Partners</span>
        <img src={amazon} alt="Amazon Pay" className="h-6" />
        <img src={american} alt="American Express" className="h-6" />
        <img src={masterCard} alt="MasterCard" className="h-6" />
        <img src={paypal} alt="PayPal" className="h-6" />
        <img src={visa} alt="Visa" className="h-6" />
      </div>

      {/* App Downloads */}
      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-gray-800 font-semibold">Get deliveries with FreshCart</span>
        <img src={appstore} alt="App Store" className="h-10" />
        <img src={googleplay} alt="Google Play" className="h-10" />
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="text-center text-gray-600 text-sm mt-8">
      © 2024 FreshCart eCommerce. All rights reserved.
    </div>
  </div>
</footer>

  )
}
