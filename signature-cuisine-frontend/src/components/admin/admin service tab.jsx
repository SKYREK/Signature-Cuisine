import React, { useEffect, useState } from "react";
import AdminServiceCard from "./service card";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function AdminServicesTab() {
    const [serviceList,setServiceList]=useState([]);
    const loadServiceList = ()=>{
        axios.get("http://localhost:5000/service").then(
            (res)=>{
                if(res.data.result){
                    setServiceList(res.data.result)
                }
            }
        )
    }
    useEffect(() => {
        const admin = JSON.parse(localStorage.getItem("admin"));
        if(!admin){
            navigate("/admin-login");
        }else{
            loadServiceList();
        }
    }, [])

    const navigate = useNavigate();
    const toAddService = () => navigate("/addservice")
    return (
        <div className="w-full flex flex-wrap justify-center relative">
            {
                serviceList.map(
                    (service,index)=>{
                        return(
                            <AdminServiceCard key={index} id={service.id} name={service.name} description={service.description} price={service.price} imgLink={service.image_link} reloader={loadServiceList}/>
                        )
                    }
                )

            }
            <div className="fixed w-20 h-20 flex shadow-lg shadow-black items-center rounded-full justify-center bottom-4 right-4 bg-[#229a00]">
                <button className="rounded-full p-2 text-white"
                onClick={
                    ()=>{
                        toAddService();
                    }
                }>
                <FaPlus size={36} />
                </button>
            </div>
        </div>  
    );
}
export default AdminServicesTab;