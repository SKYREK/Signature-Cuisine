import React, { useEffect, useState } from "react";

import knifebg from "../../assets/images/knifebg.jpg";
import MessageHead from "../../components/message/message head";
import {FaComment, FaHome } from "react-icons/fa";
import MessageBox from "../../components/message/message box";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../../utils/adminAuth";
import axios from "axios";


function MessagePage() {
  const navigate = useNavigate();
  const navigateHome = () => {
      navigate("/");
  };
  const [currentUser , setCurrentUser] = useState(null);
  useEffect(()=>{
    const user = localStorage.getItem("userToken");
    setAuthToken(user);
    axios.get("http://localhost:5000/users").then((res) => {
      setCurrentUser(res.data.result);
    }
    );
  })
  return (
    <div className="App bg-center flex flex-col align-middle items-center bg-cover h-screen min-h-screen" style={{ backgroundImage: `url(${knifebg})` }}>

        <div className="w-full h-24 min-h-[96px] flex flex-row rounded-xl backdrop-blur-lg shadow-xl my-1 cursor-pointer">
              
              <div className="w-3/4 flex flex-row h-full items-center justify-center">
                  <FaComment size={36} />
                  <span className="ml-2 text-2xl font-bold">My queries</span>
              </div>
              <div className="w-1/4 flex flex-row h-full items-center justify-center">
                  <FaHome size={36} onClick={()=>{
                    navigateHome();
                  }}/>
              </div>
              
        </div>
     
      <div className="w-3/4 flex flex-col items-center justify-center h-[90vh]  max-h-[90vh] p-3">
        {currentUser&&<MessageBox email={currentUser.email} isAdmin={false}/>}
      </div>
    </div>
  )
  ;
}
export default MessagePage;