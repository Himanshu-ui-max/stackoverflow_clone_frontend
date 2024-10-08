import React, { useState } from 'react'
import "./forgetpasswordbase.css"
import { useNavigate } from 'react-router-dom';
const ForgetPasswordBase = () => {
  const base_url = process.env.REACT_APP_BASE_URL
  const [email, setEmail] = useState("");
  const [displayText, setDisplayText] = useState("none");
  const navigate = useNavigate()
  const [Loading, setLoading] = useState(false);
  const handelGetOtp = () => {
    setLoading(true)
    fetch(base_url + `/forget_password_otp_generation?user_mail=${email}`).then(async (res) => {
      console.log(email)
      localStorage.setItem("user_email", email)
      setLoading(false)
      if (res.status === 200) {
        setDisplayText("block")
        console.log("success")
      }
      else if (res.status === 422) {
        alert("Invalid email address")
      }
      else {
        const data = await res.json()
        console.log(data)
        alert(data.detail)
      }
    })
  }
  const handelValidateOtp = () => {
    navigate("/forgotpasswordvalidation")
  }
  return (
    <div className='page'>

      <div style={{width : "50vw"}} className="bg-gradient-to-b from-white to-gray-200 text-black py-20 flex justify-center forgetclasstop">
        <div style={{width : "50%"}} className="w-1/2 text-center bg-white p-8 rounded-lg shadow-lg forgetclass">
          <h1 className="text-4xl font-bold mb-4">
            Forgot Password ???
          </h1>
          <p className="text-gray-600 mb-8">
            NO worries, Change your password thorugh OTP
          </p>
          <div >
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div>
          </div >
          <div style={{ marginTop: "15px" }} className="flex justify-center space-x-4">
            <button style={{width : "120px", textAlign : "center"}} className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600" onClick={handelGetOtp}>

              {Loading ? <div style={{textAlign : 'center', display : "flex", justifyContent : "center"}} role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-white-200 animate-spin dark:text-white-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div> : "Get OTP"}

            </button>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600" onClick={handelValidateOtp}>
              Validate OTP
            </button>
          </div>
          <p style={{ display: displayText }} className="mt-10 text-center text-sm text-indigo-600">
            OTP generated successfuly. Kindly check your mail inbox
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgetPasswordBase
