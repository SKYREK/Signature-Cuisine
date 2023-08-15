import React from "react";
import { FaHamburger, FaShoppingBag } from "react-icons/fa";
import { setAuthToken } from "../../utils/adminAuth";
import axios from "axios";

function FoodCard(props) {
    const {food} = props
  return (
<div className="w-[300px] h-[380px] flex flex-col justify-end relative items-center ">
    <div className="absolute w-[200px] h-[200px]  z-30 top-0 ">
        <img src={food.image_link} className="w-full h-full object-cover rounded-2xl" alt="" />
    </div>
    <div className="w-[250px] h-[320px] flex flex-col pt-[150px] pb-3  bg-[#114460] rounded-2xl justify-around shadow-2xl">
        <span className="w-full text-white font-bold text-xl">{food.name}</span>
        <span className="w-full text-white  text-lg">Rs.{food.price.toFixed(2)}</span>
        <button className="mx-[30px]  bg-[#229a00] text-white rounded-xl flex flex-row items-center justify-center  p-1"
        onClick={
            ()=>{
                //get current user
                const token = localStorage.getItem("userToken");
                setAuthToken(token);
                axios.get("http://localhost:5000/users").then((res) => {
                    const user = res.data.result;
                    if(user){
                        axios.post("http://localhost:5000/cart",{
                                email:user.email,
                                id:food.id,
                                quantity:1
                            }).then((res)=>{
                                console.log(res);
                            }
                            );

                    }
                }
                );
            }     
        }>
            <FaHamburger className="mr-2" /> Add to tray
        </button>
        <button className="mx-[30px]  bg-[#ed2647] text-white rounded-xl flex flex-row items-center justify-center  p-1">
            <FaShoppingBag className="mr-2" /> Order now
        </button>
        
    </div>
</div>
  )
  ;
}
export default FoodCard;