import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { setAuthToken } from "../../utils/adminAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StaffCard(props){
    const navigate = useNavigate();

    const {isOdd , username , name , age , outlet , nic , outletId , reloader} = props
    return(
        <div className={`w-[800px] my-1 ${isOdd?'bg-[#ed2647]':'bg-[#114460]'} flex flex-row items-center justify-around rounded-xl relative text-white`}>
            <span  className="w-[125px]">
                {username}
            </span>
            <span  className="w-[250px]">
                {name}
            </span>
            <span  className="w-[75px]">
                {age}
            </span>
            <span  className="w-[125px]">
                {outlet}
            </span>
            <span  className="w-[125px]">
                {nic}
            </span>
            <div className="absolute w-[950px] h-full flex flex-row justify-end items-center">
                <FaEdit size={30} className="mr-3 cursor-pointer" color="blue"
                onClick={
                    //name,oldUsername,oldBranch,oldAge , oldNIC
                    ()=>{
                        navigate("/editstaff",{state:{oldUsername : username,name,oldAge:age,oldBranch:outletId,oldNIC : nic}})
                    }
                }/>
                <FaTrash size={30} className="cursor-pointer" color="red"
                onClick={()=>{
                    if(window.confirm("Are you sure you want to delete this staff member?")){
                        const token = localStorage.getItem('adminToken')
                        setAuthToken(token)
                        axios.delete(
                            'http://localhost:5000/staff/'+username
                        ).then((res)=>{
                            console.log(res)                            
                            reloader()
                        })
                    }
                }}/>
            </div>
        </div>
    )
}
export default StaffCard;