import React, { useEffect, useState } from "react";

import knifebg from "../../../assets/images/knifebg.jpg";
import MessageHead from "../../../components/message/message head";
import {FaComment, FaHome } from "react-icons/fa";
import MessageBox from "../../../components/message/message box";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../../../utils/adminAuth";
import axios from "axios";


function AdminMessagePage() {
  const navigate = useNavigate();
  const navigateHome = () => {
      navigate("/");
  };
  const [chatHeads, setChatHeads] = useState([]);
  const [email, setEmail] = useState(null);
  function loadChatHeads(){
    const token = localStorage.getItem("adminToken");
    setAuthToken(token);
    axios.get("http://localhost:5000/message/list").then((res) => {
      console.log(res);      
      setChatHeads(res.data.result);
    }
    );
  }
  useEffect(
    () => {
      loadChatHeads();
    }, []
  )

  return (
    <div className="App bg-center flex flex-row align-middle items-center bg-cover h-screen min-h-screen" style={{ backgroundImage: `url(${knifebg})` }}>
      <div className="w-1/4 flex flex-col items-center justify-center h-[90vh]  max-h-[90vh] bg p-3 ">
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
        <div className="w-full flex flex-col backdrop-blur-lg  h-full rounded-xl shadow-xl overflow-y-scroll p-1 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-thumb-rounded-full">
          {
            chatHeads.map((chatHead , index) => {
              return(
                <MessageHead key={index}   email={chatHead.email} select={setEmail}/>
              )
            }
            )
          }
                 
        </div>
      </div>
      <div className="w-3/4 flex flex-col items-center justify-center h-[90vh]  max-h-[90vh] p-3">
        {email&&<MessageBox isAdmin={true} email={email}/>}
      </div>
    </div>
  )
  ;
}
export default AdminMessagePage;