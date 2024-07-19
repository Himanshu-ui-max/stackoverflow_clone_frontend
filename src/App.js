import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Test from "./components/Test"
import ForgetPasswordBase from './components/forgetPasswordcomps/ForgetPasswordBase';
import Forgetpasswordvalidation from './components/forgetPasswordcomps/Forgetpasswordvalidation';
import Navbar from './components/Navbar/Navbar';
import Questions from './components/Questions';
function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route element={<Questions key={"topQuestions"} type={"topQuestions"}/>} exact path="/"></Route>
          <Route element={<Login/>} exact path="/login"></Route>
          <Route element={<Signup/>} exact path="/signup"></Route>
          <Route element={<ForgetPasswordBase/>} exact path="/forgetpasswordbase"></Route>
          <Route element={<Forgetpasswordvalidation/>} exact path="/forgotpasswordvalidation"></Route>
          <Route element={<Questions key={"yourQuestions"} type={"yourQuestions"}/>} exact path="/yourquestions"></Route>
          <Route element={<Test/>} exact path="/test"></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
