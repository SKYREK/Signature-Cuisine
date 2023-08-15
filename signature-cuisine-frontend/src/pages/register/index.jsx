import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import knifebg from "../../assets/images/knifebg.jpg";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/login");
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = () => {
    if (name === "") {
      alert("Please enter your name");
      return;
    }
    if (email === "") {
      alert("Please enter your email");
      return;
    }
    if (password === "") {
      alert("Please enter your password");
      return;
    }
    if (confirmPassword === "") {
      alert("Please confirm your password");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    axios.post(
        'http://localhost:5000/users/',
        {
            name,
            email,
            password
        }
    ).then((res)=>{
        navigateLogin()
    })
    
  };

  return (
    <div className="App bg-center items-center  justify-center flex flex-col bg-cover h-screen min-h-screen" style={{ backgroundImage: `url(${knifebg})` }}>
      <div className="w-[450px] items-center backdrop-blur-lg shadow-2xl  rounded-2xl h-[600px] p-1 flex flex-col">

        <img src={logo} alt="logo" className="w-[60%] my-12" />
        <div className="relative w-64 my-1">
          <div className="absolute left-0 top-0 flex items-center pl-3 h-full">
            <FaUser className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Enter your name"
            className="pl-10 pr-3 py-2 w-full border border-solid border-[#114460] rounded-xl focus:outline-none focus:border-114460"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="relative w-64 my-1">
          <div className="absolute left-0 top-0 flex items-center pl-3 h-full">
            <FaEnvelope className="text-gray-400" />
          </div>
          <input
            type="email"
            placeholder="Enter your email"
            className="pl-10 pr-3 py-2 w-full border border-solid border-[#114460] rounded-xl focus:outline-none focus:border-114460"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="relative w-64 my-1">
          <div className="absolute left-0 top-0 flex items-center pl-3 h-full">
            <FaLock className="text-gray-400" />
          </div>
          <input
            type="password"
            placeholder="Enter your password"
            className="pl-10 pr-3 py-2 w-full border border-solid border-[#114460] rounded-xl focus:outline-none focus:border-114460"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="relative w-64 my-1">
          <div className="absolute left-0 top-0 flex items-center pl-3 h-full">
            <FaLock className="text-gray-400" />
          </div>
          <input
            type="password"
            placeholder="Confirm your password"
            className="pl-10 pr-3 py-2 w-full border border-solid border-[#114460] rounded-xl focus:outline-none focus:border-114460"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <button className="w-64 my-1 bg-[#006801] text-white rounded-xl py-2" onClick={handleRegister}>
          Register
        </button>
        <span className="w-full text-[#114460] text-center font-semibold text-lg my-2">Already have an account?</span>
        <button className="w-64 my-1 bg-[#114460] text-white rounded-xl py-2" onClick={navigateLogin}>
          Login
        </button>
      </div>

    </div>
  );
}

export default RegisterPage;
