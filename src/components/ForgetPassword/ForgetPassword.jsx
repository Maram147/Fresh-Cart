import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { notify } from "../Utils/notify.jsx";
import { baseUrl } from "../Utils/baseUrl.jsx";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();


  //?Validation for Email
  const validateEmail = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email format";
    }
    return errors;
  };


  //?Validation for Reset Code
  const validateCode = (values) => {
    const errors = {};
    if (!values.resetCode) {
      errors.resetCode = "Verification code is required";
    }
    return errors;
  };

  //?Formik for Email Step
  const forgetPasswordFormik = useFormik({
    initialValues: { email: "" },
    validate: validateEmail,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axios.post(`${baseUrl}/auth/forgotPasswords`, values);
        notify({ msg: "Verification code sent!", type: "success" });
        setStep(2);
      } catch (error) {
        notify({ msg: error.response?.data?.message || "Something went wrong", type: "error" });
      } finally {
        setLoading(false);
      }
    },
  });

  //?Formik for Reset Code Step
  const resetPasswordFormik = useFormik({
    initialValues: { resetCode: "" },
    validate: validateCode,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axios.post(`${baseUrl}/auth/verifyResetCode`, values);
        notify({ msg: "Code verified successfully!", type: "success" });
        navigate("/ResetPassword");
      } catch (error) {
        notify({ msg: error.response?.data?.message || "Invalid code", type: "error" });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          {step === 1 ? "Forgot Password" : "Verify Code"}
        </h2>

        {/* Step 1: Email Form */}

        {step === 1 && (
          <form onSubmit={forgetPasswordFormik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={forgetPasswordFormik.handleChange}
                onBlur={forgetPasswordFormik.handleBlur}
                value={forgetPasswordFormik.values.email}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter your email"
              />
              {forgetPasswordFormik.errors.email && forgetPasswordFormik.touched.email && (
                <p className="text-red-500 text-sm mt-1">{forgetPasswordFormik.errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!forgetPasswordFormik.isValid || loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200 disabled:opacity-50"
            >
              {loading ? <i className="fas fa-spinner fa-spin"></i> : "Send Verification Code"}
            </button>
          </form>
        )}

         {/*Step 2: Code Form  */}

        {step === 2 && (
          <form onSubmit={resetPasswordFormik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="resetCode" className="block text-gray-700 font-semibold mb-2">
                Enter Verification Code
              </label>
              <input
                id="resetCode"
                name="resetCode"
                type="text"
                onChange={resetPasswordFormik.handleChange}
                onBlur={resetPasswordFormik.handleBlur}
                value={resetPasswordFormik.values.resetCode}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter the code"
              />
              {resetPasswordFormik.errors.resetCode && resetPasswordFormik.touched.resetCode && (
                <p className="text-red-500 text-sm mt-1">{resetPasswordFormik.errors.resetCode}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!resetPasswordFormik.isValid || loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200 disabled:opacity-50"
            >
              {loading ? <i className="fas fa-spinner fa-spin"></i> : "Verify Code"}
            </button>
          </form>
        )}

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Remember your password?{" "}
            <a href="/login" className="text-green-600 font-semibold hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
