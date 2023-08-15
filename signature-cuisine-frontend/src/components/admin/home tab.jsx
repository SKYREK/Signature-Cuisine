import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHome, FaList, FaPeopleArrows, FaUtensils } from "react-icons/fa";

function AdminHomeTab(){
    const [foodCount,setFoodCount] = useState(0);
    const [outletCount,setOutletCount] = useState(0);
    const [staffCount,setStaffCount] = useState(0);
    const [orderCount,setOrderCount] = useState(0);
    useEffect(()=>{
        axios.get("http://localhost:5000/food").then((res)=>{
            if(res.data.result){
                setFoodCount(res.data.result.length);
            }
        })
        axios.get("http://localhost:5000/outlet").then((res)=>{
            if(res.data.result){
                setOutletCount(res.data.result.length);
            }
        })
        axios.get("http://localhost:5000/staff").then((res)=>{
            if(res.data.result){
                setStaffCount(res.data.result.length);
            }
        })
        // axios.get("http://localhost:5000/order").then((res)=>{
        //     if(res.data.result){
        //         setOrderCount(res.data.result.length);
        //     }
        // })
    },[])
    return(
        <div className="w-full flex flex-wrap justify-center">
            <div className="w-[40%] flex flex-row justify-around items-center h-[35vh] m-2 rounded-xl bg-[#ed2647] shadow-lg">
                <FaUtensils size={120} color="white"/>
                <div className="h-full flex flex-col justify-center">
                    <span className="text-white text-5xl font-bold underline mb-6">Foods</span>
                    <span className="text-white text-7xl font-extrabold">{foodCount}</span>
                </div>
            </div>
            <div className="w-[40%] flex flex-row justify-around items-center h-[35vh] m-2 rounded-xl bg-[#114460] shadow-lg">
                <FaHome size={120} color="white"/>
                <div className="h-full flex flex-col justify-center">
                    <span className="text-white text-5xl font-bold underline mb-6">Outlets</span>
                    <span className="text-white text-7xl font-extrabold">{outletCount}</span>
                </div>
            </div>
            <div className="w-[40%] flex flex-row justify-around items-center h-[35vh] m-2 rounded-xl bg-[#229a00] shadow-lg">
                <FaPeopleArrows size={120} color="white"/>
                <div className="h-full flex flex-col justify-center">
                    <span className="text-white text-5xl font-bold underline mb-6">Staff</span>
                    <span className="text-white text-7xl font-extrabold">{staffCount}</span>
                </div>
            </div>     
            <div className="w-[40%] flex flex-row justify-around items-center h-[35vh] m-2 rounded-xl bg-black shadow-lg">
                <FaList size={120} color="white"/>
                <div className="h-full flex flex-col justify-center">
                    <span className="text-white text-5xl font-bold underline mb-6">Orders</span>
                    <span className="text-white text-7xl font-extrabold">{orderCount}</span>
                </div>
            </div>            
            
        </div>
    )
}
export default AdminHomeTab;