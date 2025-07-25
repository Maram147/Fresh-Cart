import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { UserContext } from '../../Context/UserContext';

export default function Register() {

  const { setUserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  
  //?validation

  const validationSchema = yup.object().shape({
    name: yup.string().min(3, 'Name minlength is 3').max(10, 'Name maxlength is 10').required('Name is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    phone: yup.string().matches(/^01[0125][0-9]{8}$/, 'Phone must be valid').required('Phone is required'),
    password: yup
      .string()
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/, 'Password must contain uppercase, lowercase, and number (min 6 chars)')
      .required('Password is required'),
    rePassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Password and repassword must match')
      .required('Repassword is required'),
  });


     //?call API
     
  async function handleRegister(formValues) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues);
      if (data.message === 'success') {
        localStorage.setItem('userToken', data.token);
        setUserLogin(data.token);
        navigate('/Login');
      }
    } catch (error) {
      setApiError(error.response?.data?.message || 'Something went wrong, please try again');
    } finally {
      setIsLoading(false);
    }
  }


  //? formik
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: '',
    },
    validationSchema,
    onSubmit: handleRegister,
  });


  return (
    <div className="py-9 max-w-xl mx-auto text-start">
      {apiError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">{apiError}</div>}

      <h2 className="text-3xl font-bold mb-6 text-green-500">Register Now</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Name */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            id="name"
            name="name"
            type="text"
            placeholder=" "
            required
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
          />
          <label htmlFor="name" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-2 origin-[0] peer-focus:text-green-600">Enter Your Name</label>
        </div>
        {formik.errors.name && formik.touched.name && <div className="p-2 mb-2 text-sm text-red-800 bg-red-50">{formik.errors.name}</div>}

        {/* Email */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            id="email"
            name="email"
            type="email"
            placeholder=" "
            required
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
          />
          <label htmlFor="email" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-2 origin-[0] peer-focus:text-green-600">Enter Your Email</label>
        </div>
        {formik.errors.email && formik.touched.email && <div className="p-2 mb-2 text-sm text-red-800 bg-red-50">{formik.errors.email}</div>}

        {/* Phone */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder=" "
            required
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
          />
          <label htmlFor="phone" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-2 origin-[0] peer-focus:text-green-600">Enter Your Phone</label>
        </div>
        {formik.errors.phone && formik.touched.phone && <div className="p-2 mb-2 text-sm text-red-800 bg-red-50">{formik.errors.phone}</div>}

        {/* Password */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            id="password"
            name="password"
            type="password"
            placeholder=" "
            autoComplete="off"
            required
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
          />
          <label htmlFor="password" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-2 origin-[0] peer-focus:text-green-600">Enter Your Password</label>
        </div>
        {formik.errors.password && formik.touched.password && <div className="p-2 mb-2 text-sm text-red-800 bg-red-50">{formik.errors.password}</div>}

        {/* RePassword */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            id="rePassword"
            name="rePassword"
            type="password"
            placeholder=" "
            autoComplete="off"
            required
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
          />
          <label htmlFor="rePassword" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-2 origin-[0] peer-focus:text-green-600">Confirm Your Password</label>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword && <div className="p-2 mb-2 text-sm text-red-800 bg-red-50">{formik.errors.rePassword}</div>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !(formik.isValid && formik.dirty)}
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Submit'}
        </button>
      </form>
    </div>
  );
}
