import React, { useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { notify } from '../Utils/notify.jsx';
import { baseUrl } from '../Utils/baseUrl.jsx';
import { click } from '@testing-library/user-event/dist/cjs/convenience/click.js';
import toast from 'react-hot-toast';

export default function ForgetPassword() {
  let [loading, setLoading] = useState(false)
  let [flag, setFlag] = useState(false)
  let navigate = useNavigate()


  let validate = (values) => {
    let errors = {}

    if (!values.email) {
      errors.email = 'email is required ';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'invalid email ';
    }

    return errors
  }
  let validate1 = (values) => {
    let errors = {}
    if (!values.resetCode) {
      errors.resetCode = 'Code is required ';
    }

    return errors
  }
  let forgetPasswordFormik = useFormik({
    initialValues: {
      email: ''

    },
    validate
    ,
    onSubmit: async (values) => {
      //console.log(values)
      setLoading(true)

      await axios.post(`${baseUrl}/auth/forgotPasswords`, values)
        .then(data => {

          if (data.status === 200) {

            notify({ msg: 'Success', type: 'success' })
            // navigate("/reset-password")
            setFlag(true)
          }
          //console.log({data})
        }).catch(err => {
          if (err.response.status === 401) {
            notify({ msg: err.response.data.message, type: 'error' })
            setLoading(false)

          } else if (err.response.status === 400) {
            notify({ msg: err.response.data.message, type: 'error' })
            setLoading(false)

          }
          //console.log({err});
        })




    },
  })
  let resetPasswordFormik = useFormik({
    initialValues: {

      resetCode: ''
    },
    validate: validate1
    ,
    onSubmit: async (values) => {
      //console.log(values)
      setLoading(true)

      await axios.post(`${baseUrl}/auth/verifyResetCode`, values)
        .then(data => {

          if (data.status === 200) {

            notify({ msg: 'Success', type: 'success' })
            navigate("/reset-password")
            setFlag(true)
          }
          //console.log({data})
        }).catch(err => {
          // if(err.response.status ===  401)
          // {
          notify({ msg: err.response.data.message, type: 'error' })
          setLoading(false)

          // }else if(err.response.status ===  400)
          // {
          //     notify({msg:err.response.data.message , type:'error'})
          //    setLoading(false)

          // }
          //console.log({err});
        })




    },
  })
  ////console.log(forgetPasswordFormik.errors);
  ////console.log(resetPasswordFormik.errors);
  return (<>
    <div className=" container  d-flex justify-content-center align-items-center my-5  ">
      <div className='w-75 m-auto  my-5'>
        {!flag ? <>  <form onSubmit={forgetPasswordFormik.handleSubmit}>

          <h3 className='text-center my-4'>Please enter your email address. you will receive a verification code</h3>

          <label htmlFor="email" className='fw-bolder'>Email</label>
          <input onBlur={forgetPasswordFormik.handleBlur} value={forgetPasswordFormik.values.email} onChange={forgetPasswordFormik.handleChange} type="email" className='form-control my-3' id="email" name="email" />
          {forgetPasswordFormik.errors.email && forgetPasswordFormik.touched.email ? <div className="alert alert-danger">{forgetPasswordFormik.errors?.email}</div> : null}



          <button disabled={!(forgetPasswordFormik.isValid && forgetPasswordFormik.dirty && !loading)} className='btn bg-main text-white w-100 mt-4'> {!loading ? "Send" : <i className='fas fa-spinner fa-spin '></i>}</button>
        </form></> : <form onSubmit={resetPasswordFormik.handleSubmit}>

          <h3 className='text-center my-4'>Enter the code that was sent to your email..</h3>

          <input onBlur={resetPasswordFormik.handleBlur} value={resetPasswordFormik.values.resetCode} onChange={resetPasswordFormik.handleChange} placeholder='Enter verification code' type="text" name='resetCode' id='resetCode' className='form-control w-100 my-3 ' />
          {resetPasswordFormik.errors.resetCode && resetPasswordFormik.touched.resetCode ? <div className="alert alert-danger">{resetPasswordFormik.errors?.resetCode}</div> : null}
          <button className='btn bg-main text-white w-100 mt-4'>{loading ? "Verify Code" : <i className='fas fa-spinner fa-spin '></i>} </button>
        </form>
        }

      </div>

    </div>
  </>


  )
}