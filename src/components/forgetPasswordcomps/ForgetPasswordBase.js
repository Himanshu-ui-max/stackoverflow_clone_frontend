import React, { useState } from 'react'
import "./forgetpasswordbase.css"
import {useNavigate } from 'react-router-dom';
const ForgetPasswordBase = () => {
  const base_url = process.env.REACT_APP_BASE_URL
  const [email, setEmail] = useState("");
  const [displayText, setDisplayText] = useState("none");
  const navigate = useNavigate()
  const handelGetOtp=()=>{
    fetch(base_url + `/forget_password_otp_generation?user_mail=${email}`).then(async (res)=>{
      if(res.status === 200){
        setDisplayText("block")
        console.log("success")
      }
      else if (res.status === 422){
        alert("Invalid email address")
      }
      else{
        const data = await res.json()
        console.log(data)
        alert(data.detail)
      }
    })
  }
  const handelValidateOtp=()=>{
    navigate("/forgotpasswordvalidation")
  }
  return (
    <div className='page'>
      
    <div className="bg-gradient-to-b from-white to-gray-200 text-black py-20 flex justify-center">
      <div className="w-1/2 text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">
          Forgot Password ???
        </h1>
        <p className="text-gray-600 mb-8">
          NO worries, Get the OTP by clicking below and validate it by clicking below to change your password to new password
        </p>
        <div >
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
      </div >
        <div style={{marginTop : "15px"}} className="flex justify-center space-x-4">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600" onClick={handelGetOtp}>
            Get OTP
          </button>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600" onClick={handelValidateOtp}>
            Validate OTP
          </button>
        </div>
        <p style={{display : displayText}} className="mt-10 text-center text-sm text-indigo-600">
      OTP generated successfuly. Kindly check your mail inbox
    </p>
      </div>
    </div>
    </div>
  )
}

export default ForgetPasswordBase
