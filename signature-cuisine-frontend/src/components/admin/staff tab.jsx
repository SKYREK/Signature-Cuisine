import React, { useEffect, useState } from "react";

import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import StaffCard from "./staff card";
import axios from "axios";

function AdminStaffTab() {
    const [staffList,setStaffList]=useState([]);
    function loadStaffList(){
        axios.get("http://localhost:5000/staff").then(
            (res)=>{
                if(res.data.result){
                    console.log(res.data.result)
                    setStaffList(res.data.result)
                }
            }
        )
    }
    useEffect(()=>{
        const admin = localStorage.getItem("adminToken");
        if(!admin){
            navigate("/admin-login");
        }else{
            loadStaffList();
        }
    },[])


    const navigate = useNavigate();
    const toAddOutlet = () => navigate("/addstaff")
  return (
    <div className="w-full flex flex-col relative items-center">
        <div className={`w-[800px] my-1 bg-[#229a00] flex flex-row justify-around rounded-xl font-bold`}>
            <span  className="w-[125px] ">
                username
            </span>
            <span  className="w-[250px]">
                full name
            </span>
            <span  className="w-[75px]">
                age
            </span>
            <span  className="w-[125px]">
                outlet
            </span>
            <span  className="w-[125px]">
                nic
            </span>
        </div>
        {
            staffList.map((staff,index)=>{                
                return  <StaffCard key={index} username={staff.username} name={staff.name} age={staff.age} outlet={staff.outlet_name} nic={staff.nic} outletId={staff.outlet_id} isOdd={((index%2)===1)} reloader={loadStaffList}/>
            })
        }

        <div className="fixed z-50 w-20 h-20 flex shadow-lg shadow-black items-center rounded-full justify-center bottom-4 right-4 bg-[#229a00]">
                <button className="rounded-full p-2 text-white"
                onClick={
                    ()=>{
                        toAddOutlet();
                    }
                }>
                <FaPlus size={36} />
                </button>
        </div>
    </div>
  );
}
export default AdminStaffTab;