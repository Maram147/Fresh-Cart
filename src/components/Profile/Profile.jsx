import React, { useContext } from 'react';
import avter from '../../assets/images/avatar-370-456322-512.webp';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import { UserContext } from '../../Context/UserContext';

export default function Profile() {
  const { userProfile } = useContext(UserContext);

  if (!userProfile || !userProfile.name || !userProfile.email) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
         User profile not found. Please log in again.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Avter*/}
      <div className="text-center mb-6">
        <LazyLoadImage
          src={avter}
          className="w-32 h-32 mx-auto rounded-full object-cover"
          alt="userAvatar"
        />
        <h3 className="my-2 text-xl font-semibold">{userProfile.name}</h3>
      </div>

      {/* Account Details */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
        <div className="bg-gray-100 p-4 rounded-lg space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <FaUser />
              </span>
              <input
                type="text"
                value={userProfile.name}
                readOnly
                className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 bg-white"
              />
            </div>
          </div>

          {/* Email*/}
          <div>
            <label className="block mb-1 font-medium">Email address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <FaEnvelope />
              </span>
              <input
                type="email"
                value={userProfile.email}
                readOnly
                className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Change Password*/}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Manage Account</h2>
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all duration-200">
          Reset password
        </button>
      </div>
    </div>
  );
}
