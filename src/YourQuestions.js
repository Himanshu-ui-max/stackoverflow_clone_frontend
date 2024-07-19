import React, { useEffect, useState } from "react"
import {Link, useNavigate } from "react-router-dom";

let i = -1
let questions = []
export default function YourQuestions() {
    const base_url = process.env.REACT_APP_BASE_URL
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        setLoading(true)
        fetch(base_url + "/get_user_questions", {
            method: "GET",
            headers: {
                "Token": localStorage.getItem("user_token")
            }
        }).then(async (res) => {
            const data = await res.json()
            setLoading(false)
            if (res.status == 200) {
                questions = data
                console.log(questions)
            }
            else {
                alert("Some Internal eror occured. Redirecting to login page")
                localStorage.removeItem("user_token")
                navigate("/login")
            }
        }).catch((error) => {
            alert(error + " Redirecting to login page")
            localStorage.removeItem("user_token")
            navigate("/login")
        })
    }, []);
    return (
        <div style={{ width: "100vw", height: "90vh", display: "flex", justifyContent: "center", paddingTop : "20px"}}>
            <div style={{ width: "80vw", overflow: "auto" }}>

                {!loading ?(<ul role="list" className="divide-y divide-gray-100">
                    {questions.map((question) => {i++
                        return (
                            <Link key={question.id} style={{width : "50vw"}} to={`/question/${question.id}`}>
                        <li className="flex justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{question.title}</p>
                                    {question.tags.map((tag) => {
                                        return (<spam key={tag} className="mt-1 truncate text-xs leading-5 text-gray-500">{tag}</spam>)
                                    })}
                                </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900">{i}</p>
                            </div>
                        </li>
                            </Link>
                        )
                    })}
                </ul>) : "loading..."}
            </div>
        </div>
    )
}
