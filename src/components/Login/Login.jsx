import React, { useContext, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
  const { setUserLogin, setUserProfile } = useContext(UserContext);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

//?to sure if there token or no 
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      navigate('/');
    }
  }, [navigate]);


  //?validation

  const validationSchema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/,
        'Password must contain uppercase, lowercase, and number, min 6 chars'
      )
      .required('Password is required'),
  });


   //?call API
  async function handleLogin(formValues) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        formValues
      );

      if (data.message === 'success') {
        localStorage.setItem('userToken', data.token);
        setUserLogin(data.token);
        localStorage.setItem('userProfile', JSON.stringify(data.user));
        setUserProfile(data.user);
        navigate('/');
      }
    } catch (error) {
      setApiError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }


  // ?formik
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: handleLogin,
  });


  //?if api error or no 
  useEffect(() => {
    if (apiError) setApiError('');
  }, [formik.values]);

  return (
    <div className="py-9 max-w-xl mx-auto text-start">
      {apiError && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          {apiError}
        </div>
      )}

      <h2 className="text-3xl font-bold mb-6 text-green-500">Login Now</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Email */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            id="email"
            required
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder=" "
            type="email"
            name="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 origin-[0] peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Email
          </label>
        </div>
        {formik.errors.email && formik.touched.email && (
          <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50">{formik.errors.email}</div>
        )}

        {/* Password */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            id="password"
            required
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder=" "
            type="password"
            name="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 origin-[0] peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Password
          </label>
        </div>
        {formik.errors.password && formik.touched.password && (
          <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50">{formik.errors.password}</div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !(formik.isValid && formik.dirty)}
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Login'}
        </button>

        <div className="pt-4">
          <Link to="/ForgetPassword" className="text-green-600">
            Forget Password?
          </Link>
        </div>

        <p className="pt-4 text-green-600">
          Didn't Have Account Yet?
          <span className="font-semibold">
            <Link to="/Register"> Register Now</Link>
          </span>
        </p>
      </form>
    </div>
  );
}
