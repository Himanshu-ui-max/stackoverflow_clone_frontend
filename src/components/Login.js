import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const base_url = process.env.REACT_APP_BASE_URL
  const navigate = useNavigate()
  const handleOnSubmit = (e)=>{
    e.preventDefault()
    fetch(base_url + "/login",{
      method : "POST",
      headers : {
        "Accept" : "application/json",
        "Content-Type" : "application/x-www-form-urlencoded"
      },
      body : new URLSearchParams({
        "email" : email,
        "password" : password,
        "isAdmin" : false 
      })
    }).then(async (res)=>{
      const data = await res.json()
      if(res.status === 200){
          console.log(data)
          localStorage.setItem("token", data)
          navigate("/")
      }
      else{
        alert(data.detail)
      }
    }).catch((e)=>{
      alert(e)
    })
  }
  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" action="#" method="POST" onSubmit={(e)=>{handleOnSubmit(e)}}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
            <Link to="/forgetpasswordbase" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
          </div>
        </div>
        <div className="mt-2">
          <input id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Not a user?
      <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Click here to create an account</Link>
    </p>
  </div>
</div>
    </div>
  )
}

export default Login
