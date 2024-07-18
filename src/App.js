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
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Login/>} path="/login"></Route>
          <Route element={<Signup/>} path="/signup"></Route>
          <Route element={<ForgetPasswordBase/>} path="/forgetpasswordbase"></Route>
          <Route element={<Forgetpasswordvalidation/>} path="/forgotpasswordvalidation"></Route>
          <Route element={<Test/>} path="/test"></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
