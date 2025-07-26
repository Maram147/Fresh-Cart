import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { UserContext } from '../../Context/UserContext';

export default function ResetPassword() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserLogin} = useContext(UserContext);


  //?validation
  const schemaValidation = Yup.object({
    email: Yup.string().required('Email is required').email('Enter a valid email'),
    newPassword: Yup.string()
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/, 'Password must contain uppercase, lowercase, and number (min 6 chars)')
      .required('Password is required'),
      
  });

  //?call API
  const formik = useFormik({
    initialValues: { email: '', newPassword: '' },
    validationSchema: schemaValidation,
    onSubmit: async (values) => {
  setLoading(true);
  try {
    const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values);
    console.log("API Response:", data);

    if (data.token) {
      toast.success("Password reset successfully");
      localStorage.clear();
      setUserLogin(null);
      navigate("/login");
    } else {
      toast.error("No token returned, something went wrong");
    }
  } catch (error) {
    console.error("Reset Error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
}
  });



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Helmet>
        <title>Reset Password</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Reset your password securely. Regain access to your profile and protect your account."
        />
      </Helmet>

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Reset Password</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter your email"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 font-semibold mb-1">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              autoComplete="off"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter new password"
            />
            {formik.errors.newPassword && formik.touched.newPassword && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!formik.isValid || isLoading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200 disabled:opacity-50"
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin mr-2"></i>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Back to{" "}
            <a href="/login" className="text-green-600 font-semibold hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
