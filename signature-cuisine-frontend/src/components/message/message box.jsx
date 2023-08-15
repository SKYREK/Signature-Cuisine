import React, { useEffect, useState } from "react";
import Message from "./message";
import { FaArrowCircleRight } from "react-icons/fa";
import { CircularProgress } from "@material-ui/core";
import { setAuthToken } from "../../utils/adminAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function MessageBox(props){

    const {isAdmin , email} = props;
    const listLoading =  false;
    
    const [messageList, setMessageList] = useState([]);
    const [message , setMessage] = useState("");

    function loadMessageList(){
      axios.get("http://localhost:5000/message/"+email).then((res) => {
        console.log(res);
        setMessageList(res.data.result);

      }
      );
    }
    function sendMessage() {
      if(isAdmin){
        const user = localStorage.getItem("adminToken");
        setAuthToken(user);
        axios.post("http://localhost:5000/message/admin", {
        email : email,
        content : message
        }).then((res) => {
          console.log(res);
          loadMessageList();
          setMessage("")
        }
        );
      }else{
        const user = localStorage.getItem("userToken");
        setAuthToken(user);
        axios.post("http://localhost:5000/message", {
        content : message
        }).then((res) => {
          console.log(res);
          loadMessageList();
          setMessage("")
        }
        );
      }
      
      
    }
    
    useEffect(
      () => {
        loadMessageList();
      }, []
    )
  
    const navigate = useNavigate();

    return(
        <div className="w-full bg-glass h-full rounded-xl shadow-xl p-2 relative">

        {listLoading?
        <div className=" h-full pb-24 flex items-center justify-center">
          <CircularProgress/>
        </div>:
        <div className=" h-full pb-24 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-600 scrollbar-thumb-rounded-full">
          {
            messageList.map((message)=>{
              return <Message isOwn={isAdmin?message.type==="admin":message.type==="user"} content={message.content}/>
            }
            )
          }

        </div>}
        <div className="absolute left-0 right-0 mx-2 p-3 bottom-0 h-24">
          <div className="w-full flex flex-row items-center justify-center">
            <textarea value={message} placeholder="Type your query here" className="w-full h-12 rounded-xl p-2 border border-black" 
            onChange={
              (e)=>{
                setMessage(e.target.value);
              }
            }/>
            <FaArrowCircleRight size={48} color="#234c65" className="ml-2 cursor-pointer" 
            onClick={()=>{
              if(message.length>0)
                sendMessage();
            }}/>
          </div>
        </div>
      </div>
    );
}
export default MessageBox;