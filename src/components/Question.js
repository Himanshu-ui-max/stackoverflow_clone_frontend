import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Question = () => {
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [question, setQuestion] = useState({});
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate()
    const { id } = useParams()
    const base_url = process.env.REACT_APP_BASE_URL;
    const fetchQuestion = () => {
        setLoading1(true)
        let url = `${base_url}/get_question_by_id?que_id=${id}`
        fetch(url).then(async (res) => {
            setLoading1(false)
            const data = await res.json()
            if (res.status === 200) {
                console.log(data)
                setQuestion({ ...data })
                setQuestion({ ...data })
                setQuestion(data)
                console.log(question)
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
    const fetchAnswer = () => {
        setLoading1(true)
        let url = `${base_url}/get_answers_by_question_id?que_id=${id}`
        fetch(url).then(async (res) => {
            setLoading1(false)
            const data = await res.json()
            if (res.status === 200) {
                console.log(data)
                setAnswers(data)
                console.log(answers)
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
        fetchQuestion();
        fetchAnswer();
    }, []);
    return (
        <div style={{ width: "100vw", display : "flex", flexDirection : "column", alignItems : "center" }}>
            <div style={{width : "80vw", display: 'flex', justifyContent: "space-between" }} className='heading'>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: "10px" }} className='text'>
                    <div style={{ fontSize: "2rem" }} className='title'><b>{question.title}</b></div>
                    <div className='tags'>{(question.tags)?.map((tag, i) => {
                        return (
                            <div style={{ marginRight: "5px", fontSize: "1rem" }} key={i} className="badge text-blue-500">{tag}</div>
                        )
                    })}</div>
                </div>
                <div style={{ display: 'flex', alignItems: "center", marginRight: "10px" }} className='answerButt'> <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Answer
                </button></div>
            </div>
            <div style={{width : "80vw", height : "70vh", display : "flex",flexDirection : "column",alignItems : "center", marginTop : "50px", overflow : "auto"}}>
                {
                    answers.map((answer)=>{
                        return(
                            <div style={{width : "65vw", border : "1px solid grey", borderRadius : "3px", marginBottom : "10px"}}>
                                <p>
                                    Answer by <b>{answer.owner_name}</b>
                                </p>
                                <hr/>
                                <p>
                                    {answer.answer}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Question
