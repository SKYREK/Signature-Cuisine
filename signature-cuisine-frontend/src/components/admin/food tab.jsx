import React, { useEffect, useState } from "react";
import AdminFoodCard from "./admin food card";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminFoodTab(){
    const navigate = useNavigate();
    const toAddFood = () => navigate("/addfood")
    const [foodList,setFoodList] = useState([]);
    function getFoodList(){
        axios.get(
            "http://localhost:5000/food",
        ).then((res) => {
            console.log(res.data);
            if(res.data.result){
               setFoodList(res.data.result);
            }else if(res.data.err){
                console.log(res);
            }
        }
        ).catch((err) => {
            console.log(err);
        }
        );
    }
    useEffect(() => {
        const admin = JSON.parse(localStorage.getItem("admin"));
        if(!admin){
            navigate("/admin-login");
        }else{
            getFoodList();
        }
    }, [])
    
    return(
        <div className="w-full flex flex-wrap justify-center relative">
            {
                
                foodList.map(
                    (food , index) => {
                        
                        return(
                            <AdminFoodCard key={index} reloader={getFoodList} id={food.id} foodName={food.name} price={food.price} imageLink={food.image_link} />
                        )
                    }
                )
            }
            <div className="fixed w-20 h-20 flex shadow-lg shadow-black items-center rounded-full justify-center bottom-4 right-4 bg-[#229a00]">
                <button className="rounded-full p-2 text-white"
                onClick={
                    ()=>{
                        toAddFood();
                    }
                }>
                <FaPlus size={36} />
                </button>
            </div>
        </div>
    )
}
export default AdminFoodTab;