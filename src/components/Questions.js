import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import "./questions.css"
export default function Questions(props) {
    const { type, query, mount } = props;
    const base_url = process.env.REACT_APP_BASE_URL;
    const [loading, setLoading] = useState(false);
    const [pagenumber, setPagenumber] = useState(1);
    const [questions, setQuestions] = useState([]);
    const pagesize = 5;
    const [heading, setHeading] = useState("");
    const navigate = useNavigate();
    const [loadinDelete, setLoadinDelete] = useState(false);
    const handleDelete=(id)=>{
        setLoadinDelete(true)
        fetch(`${base_url}/delete_question?ques_id=${id}`, {
            method : "DELETE",
            headers : {
                "Token" : localStorage.getItem("user_token")
            }
        }).then((res)=>{
            if(res.status === 200){
                alert("question deleted successfuly")
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
    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            try {
                let url = '';
                let options = {};

                if (type === "topQuestions") {
                    url = `${base_url}/get_questions?pagesize=${pagesize}&pagenumber=${pagenumber}`;
                } else if (type === "yourQuestions") {
                    url = `${base_url}/get_user_questions`;
                    options = {
                        method: "GET",
                        headers: {
                            "Token": localStorage.getItem("user_token")
                        }
                    };
                }
                else if (type === "searchByTitle") {
                    if (query === "") {
                        navigate("/")
                    }
                    setHeading(query)
                    url = `${base_url}/get_question_by_title?title=${query}`
                }

                const res = await fetch(url, options);
                const data = await res.json();
                setLoading(false);

                if (res.status === 200) {
                    setQuestions(data);
                } else {
                    alert("Some error occurred. Redirecting to login page");
                    localStorage.removeItem("user_token")
                    navigate("/login");
                }
            } catch (error) {
                alert(error + ". Redirecting to login page");
                localStorage.removeItem("user_token");
                navigate("/login");
            }
        };

        fetchQuestions();
    }, [base_url, pagenumber, type, navigate, mount]);

    return (

        <>
            <h1 style={{ marginBottom: "30px", marginTop: "30px", textAlign: "center" }}>{type === "topQuestions" ? "Top Questions" : type === "yourQuestions" ? "Your Questions" : `Showing result for : ${heading}`}</h1>
            <div style={{ width: "99vw", height: "90vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "80vw", overflow: "auto", height: type === "topQuestions" ? "50vh" : "70vh" }}>
                    {!loading ? (
                        <ul role="list" className="divide-y divide-gray-100">
                            {questions.map((question) => (
                                <>
                                    <Link className="link" key={question.id} style={{ width: "50vw", borderRadius: "50px" }} to={`/question/${question.id}`}>
                                        <li style={{ paddingRight: "10px", paddingLeft: "10px", borderRadius: "10px" }} className="flex justify-between gap-x-6 py-5">
                                            <div className="flex min-w-0 gap-x-4">
                                                <div className="min-w-0 flex-auto">
                                                    <p className="text-sm font-semibold leading-6 text-gray-900">{question.title}</p>
                                                    {question.tags.map((tag) => (
                                                        <span key={tag} className="mt-1 truncate text-xs leading-5 text-gray-500">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                <p className="text-sm leading-6 text-gray-900">&rarr;</p>
                                            </div>
                                        </li>
                                    </Link>
                                    {type === "yourQuestions" && (<div>
                                        <button style={{marginRight : "5px"}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => { navigate(`/edit_question/${question.id}`) }}>
                                            Edit
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => { handleDelete(question.id) }}>
                                            Delete
                                        </button>
                                    </div>)}
                                    <hr style={{width: "2px"}} />
                                </>
                            ))}
                        </ul>
                    ) : "loading..."}
                </div>
                {type === "topQuestions" && (<div style={{ marginTop: "20px" }} className="join grid grid-cols-2">
                    <button disabled={pagenumber === 1} onClick={(e) => { setPagenumber(pagenumber - 1) }} className="join-item btn btn-outline">Previous page</button>
                    <button disabled={questions.length < 5} onClick={(e) => { setPagenumber(pagenumber + 1) }} className="join-item btn btn-outline">Next</button>
                </div>)}
            </div>
        </>
    )
}
