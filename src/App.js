import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Test from "./components/Test"
import ForgetPasswordBase from './components/forgetPasswordcomps/ForgetPasswordBase';
import Forgetpasswordvalidation from './components/forgetPasswordcomps/Forgetpasswordvalidation';
import Navbar from './components/Navbar/Navbar';
import Questions from './components/Questions';
import Question from './components/Question';
import PostAnswer from './components/PostAnswer';
function App() {
  const [query, setQuery] = useState("");
  const [mount, setMount] = useState(false);
  return (
    <>
      <Router>
        <Navbar query={query} setQuery={setQuery} mount={mount} setMount={setMount}/>
        <Routes>
          <Route element={<Questions key={"topQuestions"} type={"topQuestions"} query={query} mount={mount}/>} exact path="/"></Route>
          <Route element={<Questions key={"searchByTitle"} type={"searchByTitle"} query={query} mount={mount}/>} exact path="/search_by_title"></Route>
          <Route element={<Login/>} exact path="/login"></Route>
          <Route element={<Signup/>} exact path="/signup"></Route>
          <Route element={<ForgetPasswordBase/>} exact path="/forgetpasswordbase"></Route>
          <Route element={<Forgetpasswordvalidation/>} exact path="/forgotpasswordvalidation"></Route>
          <Route element={<Questions key={"yourQuestions"} type={"yourQuestions"} query={query} mount={mount}/>} exact path="/yourquestions"></Route>
          <Route element={<Test/>} exact path="/test"></Route>
          <Route element={<Question/>} exact path="/question/:id"></Route>
          <Route element={<PostAnswer/>} exact path="/post_answer/:id"></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
