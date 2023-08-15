import React from "react";
import { FaEdit,  FaTrash } from "react-icons/fa";
import { setAuthToken } from "../../utils/adminAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminFoodCard(props) {
    const navigate = useNavigate();
    const {id,foodName,price,imageLink,reloader}=props;
    console.log(props)
  return (
<div className="w-[300px] h-[380px] flex flex-col justify-end relative items-center my-2">
    <div className="absolute w-[200px] h-[200px]  z-30 top-0 ">
        <img src={imageLink} className="w-full h-full object-cover rounded-2xl" alt="" />
    </div>
    <div className="w-[250px] h-[320px] flex flex-col pt-[150px] pb-3  bg-[#114460] rounded-2xl justify-around shadow-2xl">
        <span className="w-full text-white font-bold text-xl">{foodName}</span>
        <span className="w-full text-white  text-lg">Rs.{price.toFixed(2)}</span>
        <button className="mx-[30px]  bg-[#229a00] text-white rounded-xl flex flex-row items-center justify-center  p-1"
        onClick={()=>{
            navigate("/editfood",{state:{id,foodName,price,imageLink}})
        }}>
            <FaEdit className="mr-2" /> Edit dish
        </button>
        <button className="mx-[30px]  bg-[#ed2647] text-white rounded-xl flex flex-row items-center justify-center  p-1"
        onClick={()=>{
            if(window.confirm("Are you sure you want to delete this dish?")){            
                const token = localStorage.getItem('adminToken')
                setAuthToken(token)                
                axios.delete(
                    'http://localhost:5000/food/'+id
                ).then((res)=>{
                    console.log(res)
                    reloader()
                })
            }
        }}>
            <FaTrash className="mr-2" /> Delete Dish
        </button>
        
    </div>
</div>
  )
  ;
}
export default AdminFoodCard;