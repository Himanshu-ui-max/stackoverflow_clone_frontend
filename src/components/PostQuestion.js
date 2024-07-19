import React, { useState } from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; //quill's css important
import { TagsInput } from "react-tag-input-component";
import "./postquestion.css"
import { useNavigate } from 'react-router-dom';
const PostQuestion = () => {
    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");
    const [tag, setTag] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const base_url = process.env.REACT_APP_BASE_URL;
    const handleSubmit = () => {
        setLoading(true)
        fetch(base_url + "/create_question",{
            method : "POST",
            headers : {
                "Token" : localStorage.getItem("user_token"),
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                "title" : title,
                "Question" : question,
                "tags" : tag.split(",")
            })
        }).then(async (res)=>{
            const data = res.json()
            if(res.status === 200){
                alert("Question posted successfuly. Redirecting to homepage")
                navigate("/")
            }
            else if (res.status === 400){
                alert("You have already answered this question. Redirecting to homepage")
                navigate("/")
            }
            else{
                alert("Some internal error occured. Redirecting to login page")
                localStorage.removeItem("user_token")
                navigate("/login")
            }
        }).catch((error)=>{
            alert(error + ". Redirecting to login page")
            localStorage.removeItem("user_token")
            navigate("/login")
        })
    }
    var toolbarOptions = [
        ['bold', 'Italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }], // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
        [{ 'direction': 'rtl' }], // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'] // remove formatting button
    ];
    const module = {
        toolbar: toolbarOptions
    }
    return (
        <div className="add-question">
            <div className="add-question-container">
                <div className="head-title">
                    <h1>Ask a public question</h1>
                </div>
                <div className="question-container">
                    <div className="question-options">
                        <div className="question-option">
                            <div className="title">
                                <h3>Title</h3>
                                <small>
                                    Be specific and imagine you’re asking a question to another
                                    person
                                </small>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    placeholder="e.g Is there an R function for finding teh index of an element in a vector?"
                                />
                            </div>
                        </div>
                        <div className="question-option">
                            <div className="title">
                                <h3>Body</h3>
                                <small>
                                    Include all the information someone would need to answer your
                                    question
                                </small>
                                <ReactQuill
                                    value={question}
                                    onChange={setQuestion}
                                    modules={module}
                                    className="react-quill"
                                    theme="snow"
                                />
                            </div>
                        </div>
                        <div className="question-option">
                            <div className="title">
                                <h3>Tags</h3>
                                <small>
                                    Kindly seperate your tags using commas
                                </small>
                                {/* <input
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  data-role="tagsinput"
                  data-tag-trigger="Space"
                  type="text"
                  placeholder="e.g. (asp.net-mvc php react json)"
                /> */}

                                {/* <TagsInput
                  value={tag}
                  onChange={setTag}
                  name="fruits"
                  placeHolder="press enter to add new tag"
                /> */}
                                <input value={tag} name='fruits' onChange={(e) => { setTag(e.target.value) }}></input>

                                {/* <ChipsArray /> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{marginTop : "10px"}}>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                        handleSubmit()
                    }}>
                        {loading ? <div style={{ textAlign: 'center', display: "flex", justifyContent: "center" }} role="status">
                            <svg aria-hidden="true" className="w-8 h-8 text-white-200 animate-spin dark:text-white-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div> : "post Answer"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PostQuestion
