// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = (props) => {
    const {query, mount} = props
    const navigate = useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem("user_token")
        navigate("/login")
    }
    return (localStorage.getItem("user_token") && 
        (<div style={{height : "10vh"}} className="navbar bg-white-100">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">Stack overflow clone</Link>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        if(query !== ""){
                            props.setMount(!mount)
                            navigate("/search_by_title")
                        }
                        }}>

                    <input style={{width : "500px"}} type="search" placeholder="Search" className="input input-bordered w-24 md:w-auto" value={query} onChange={(e)=>{props.setQuery(e.target.value)}} />
                    </form>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><Link to= "/post_question">Post questions</Link></li>
                        <li><Link to= "/yourquestions">Your questions</Link></li>
                        <li>
                            <Link to="/youranswers" className="justify-between">
                                Your answers
                            </Link>
                        </li>
                        <li><button onClick={handleLogout}>{localStorage.getItem("user_token") ? "Log out" : "log in"}</button></li>
                    </ul>
                </div>
            </div>
        </div>)
    );
};

export default Navbar;
