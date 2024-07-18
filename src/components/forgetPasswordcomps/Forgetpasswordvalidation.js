import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Forgetpasswordvalidation = () => {
    const [otp, setotp] = useState();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const base_url = process.env.REACT_APP_BASE_URL
    const navigate = useNavigate()
    const handleOnSubmit = (e) => {
        e.preventDefault()
        console.log(localStorage.getItem("user_email"))
        if (confirmPassword !== password) {
            alert("confirm password and password are not same")
        }
        else {
            fetch(base_url + "/forget_password_otp_validation", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    "user_mail": localStorage.getItem("user_email"),
                    "otp": otp,
                    "new_password": password
                })
            }).then(async (res) => {
                localStorage.removeItem("user_email")
                const data = await res.json()
                if (res.status === 200) {
                    alert(data.message + " redirecting to login page")
                    navigate("/login")
                }
                else if(res.status === 422){
                    alert("OTP not generated. Redirecting to forget password page")
                    navigate("/forgetpasswordbase")
                }
                else {
                    console.log(data.detail)
                    alert(data.detail)
                }
            }).catch((e) => {
                alert(e)
            })
        }
    }
    return (
        <div>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Change you password</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST" onSubmit={(e) => { handleOnSubmit(e) }}>
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium leading-6 text-gray-900">OTP</label>
                            <div className="mt-2">
                                <input id="otp" name="otp" type="number" autocomplete="otp" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={otp} onChange={(e) => { setotp(e.target.value) }} />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">New Password</label>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Change password</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Don't have OTP?
                        <Link to="/forgetpasswordbase" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Click here to get an OTP</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Forgetpasswordvalidation
