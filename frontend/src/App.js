import { Routes, Route, } from "react-router-dom";
import { useState, createContext } from "react";


import "./App.css";

import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";
import Navbar from "./components/NavBar";
import AddBlog from "./components/AddBlog";
import ViewBlog from "./components/ViewBlog";
import axios from "axios";

const AuthContext =  createContext(null)


function App() {
  const [token, setToken] = useState(null);

  const handleLogin = async (password) => {
    axios.post("http://localhost:3000/login", {
      password: password
    }).then(res => {
      setToken(res.data)
    })
  }

  const authObj = {
    token: token,
    handleLogin: handleLogin,
  }


  return (
    <AuthContext.Provider value={authObj}>
      <Routes>
        <Route path="/" element={<Navbar/>}>
          <Route path="/add" element={<AddBlog />}/>
          <Route path="/view" element={<ViewBlog />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="*" element={<ErrorPage />}/>
        </Route>
      </Routes>
    </ AuthContext.Provider>
  );
}

export default App;
export { AuthContext };
