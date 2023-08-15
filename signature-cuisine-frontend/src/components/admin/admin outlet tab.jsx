import React, { useEffect, useState } from "react";
import AdminOutletCard from "./outlet card";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminOutletTab() {

    const navigate = useNavigate();
    const toAddOutlet = () => navigate("/addoutlet")
    const [outletList,setOutletList]=useState([]);
    const loadList = ()=>{
      axios.get("http://localhost:5000/outlet").then(
        (res)=>{
          if(res.data.result){
            setOutletList(res.data.result)
          }
        }
      )
    }
    useEffect(() => {
        const admin = JSON.parse(localStorage.getItem("admin"));
        if(!admin){
            navigate("/admin-login");
        }else{
            loadList();
        }
    }, [])

  return (
    <div className="w-full flex flex-col relative">
        {
          outletList.map(
            (outlet,index)=>{
              return(
                <AdminOutletCard key={index} id={outlet.id} name={outlet.name} location={outlet.location} phone={outlet.phone} openHrs={outlet.open_time} facebook={outlet.facebook} instagram={outlet.Instagram} imgLink={outlet.imgLink} isOdd={((index%2)===1)}  reloader={loadList}/>
              )
            }
          )
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
export default AdminOutletTab;