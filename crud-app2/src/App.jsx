import axios from "axios";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useState } from 'react';
import Create from './Components/Create';
import Read from "./Components/Read";
import Update from "./Components/Update";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  const [name, setName]= useState("");
    const [email, setEmail]= useState("");
    const [error, setError]= useState("");
    //const header= {"Access-Control-Allow-Origin": "*" };
    const handleSubmit = async (e) => {
  e.preventDefault();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
  setError("Please enter a valid email");
  return false;
}

  if (name.trim() === "") {
    console.log("Validation Failed");
    setError("Name is required");
    return false;
  }
  if(email.trim() === ""){
    console.log("Validation Failed");
    setError("Email is required")
    return false;
  }

  console.log("Validation Passed");
  setError("");

  await axios.post(
    "https://6a4f84daf45d5352b6118b41.mockapi.io/crud-youtube",
    {
      name,
      email,
    }
  );

  return true;
};

  return (
    <BrowserRouter>
    <div className="container">
  <Routes>
    <Route
      path="/"
      element={
          <Create
            setName={setName}
            setEmail={setEmail}
            handleSubmit={handleSubmit}
            error={error}
          />   
      }
    />
    <Route
            path="/read"
            element={<Read />}
          />
    <Route
           path="/update" 
           element={<Update />} 
           />
           
  </Routes>
  <ToastContainer />
  </div>
</BrowserRouter>
  )};

export default App
