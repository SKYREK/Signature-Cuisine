import React, { useState } from "react";
import logo from "../../../assets/images/admin_logo.png";
import knifebg from "../../../assets/images/knifebg.jpg";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//email validation function
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}


function AdminLoginPage() {
  const navigate = useNavigate();
  const navigateRegister = () => {
    navigate("/register");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if(!validateEmail(email)){
      alert("Please enter a valid email address");
      return;
    }
    if(password.length < 1){
        alert("Please enter a valid password");
        return;
    }
    axios.post(
        "http://localhost:5000/admin/login",
        {
            email,
            password
        }
    ).then((res) => {
        console.log(res.data);
        if(res.data.result){
            localStorage.setItem("adminToken", res.data.result[0].token);
            localStorage.setItem("admin", JSON.stringify(res.data.result[0]));
            navigate("/admin/summary");
        }else if(res.data.err){
            alert(res.data.err)
        }
    }
    ).catch((err) => {
        console.log(err);
    }
    );

  };

  return (
    <div className="App bg-center items-center  justify-center flex flex-col bg-cover h-screen min-h-screen" style={{ backgroundImage: `url(${knifebg})` }}>
      <div className="w-[450px] items-center backdrop-blur-lg shadow-2xl rounded-2xl h-[500px] p-1 flex flex-col">

        <img src={logo} alt="logo" className="w-[60%] my-12" />
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
        <button className="w-64 my-1 bg-[#114460] text-white rounded-xl py-2" onClick={handleLogin}>
          Login
        </button>
        <span className="w-full text-[#114460] text-center font-semibold text-lg my-2">Do not have an account?</span>
        <button className="w-64 my-1 bg-[#006801] text-white rounded-xl py-2" onClick={navigateRegister}>Register</button>
      </div>

    </div>
  );
}

export default AdminLoginPage;
