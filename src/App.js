import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Login/>} path="/login"></Route>
          <Route element={<Signup/>} path="/signup"></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
