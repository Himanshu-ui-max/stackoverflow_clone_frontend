import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import HTMLReactParser from 'html-react-parser/lib/index';
import "./answers.css"

const Answers = () => {
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [loadinDelete, setLoadinDelete] = useState(false);
    const base_url = process.env.REACT_APP_BASE_URL;
    const handleDelete=(id)=>{
        setLoadinDelete(true)
        fetch(`${base_url}/delete_answer?answer_id=${id}`, {
            method : "DELETE",
            headers : {
                "Token" : localStorage.getItem("user_token")
            }
        }).then((res)=>{
            if(res.status === 200){
                alert("Answer deleted successfuly")
                window.location.reload()
            }
            else{
                alert("Some internal error occured. Redirecting to login page")
                navigate("/login")
            }
        }).catch((error)=>{
            alert(error)
        })
    }
    const fetchAnswers = () => {
        setLoading(true)
        fetch(`${base_url}/get_user_answers`, {
            method: "GET",
            headers: {
                "Token": localStorage.getItem("user_token")
            }
        }).then(async (res) => {
            const data = await res.json()
            if (res.status === 200) {
                console.log(data)
                setAnswers(data)
            }
            else {
                alert("Some internal error occured. Redirecting to login page")
                localStorage.removeItem("user_token")
                navigate("/login")
            }
        }).catch((error) => {
            alert(error + ". Redirecting to login page")
            localStorage.removeItem("user_token")
            navigate("/login")
        })
    }
    useEffect(() => {
        fetchAnswers()
    }, []);
    return (
        <div style={{ width: "100vw", display: "flex", flexDirection: "column", alignItems: 'center' }}>
            <h1>Your answers</h1>
            <div style={{ width: "80vw", height: "70vh", overflow: "auto", marginTop: "50px" }}>
                {
                    answers.map((answer) => {
                        return (
                            <div style={{width: "77vw", border : "1px solid black",borderRadius : "3px", marginBottom : "10px", paddingBottom : "10px", paddingLeft : "10px"}}>
                                <Link className='answer-link' to={`/question/${answer.question_id}`}>
                                    <div style={{paddingLeft : "10px", paddingTop: "10px", paddingBottom: "10px", marginLeft: "-10px",marginBottom: "10px" }}>
                                        {answer.question_title}
                                    </div>
                                </Link>
                                <div style={{display : "flex", justifyContent : "space-between"}}>
                                    <div>
                                        {answer.answer && HTMLReactParser(answer.answer)}
                                    </div>
                                    <div style={{marginRight : "10px"}}>
                                    <button style={{ marginRight: "5px" }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => { navigate(`/edit_answer/${answer.id}`) }}>
                                        Edit
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => { handleDelete(answer.id) }}>
                                        Delete
                                    </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Answers
