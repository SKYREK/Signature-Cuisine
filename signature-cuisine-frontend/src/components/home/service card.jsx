

import React from "react";
import { FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../../utils/adminAuth";
import axios from "axios";
//360
function ServiceCard(props) {
    const navigate = useNavigate();
    const {service} = props
    return (
        <div className="w-[640px] h-[460px]  relative flex flex-col overflow-hidden m-4">
            <div className="w-full h-[460px] overflow-hidden rounded-3xl">
                <img className="w-full" src={service.image_link} alt="service"/>
            </div>
            <div className="w-full absolute flex flex-col pt-[360px] transition-all  duration-500 ease-in-out hover:pt-0 ">
                <div className="bg-[#0000006c] h-[460px] rounded-3xl">
                    <div className="h-[100px] flex flex-col justify-center items-center">
                        <span className="text-white text-3xl font-bold">{service.name}</span>
                    </div>
                    <div className="h-[200px] flex flex-col justify-center items-center">
                        <span className="text-white ">{service.description}</span>
                    </div>
                    <div className="h-[80px] flex flex-row justify-center items-center">
                        <span className="text-white text-3xl ">Rs.{service.price.toFixed(2)}</span>
                        <span className="text-white"></span>
                    </div>
                    <div className="h-[80px] flex flex-row justify-center items-center">
                        <button className="w-[200px] h-[50px] bg-[#114460] text-white rounded-xl flex flex-row items-center justify-center  p-1"
                        onClick={
                            ()=>{
                                const token = localStorage.getItem("userToken");
                                setAuthToken(token)
                                axios.get("http://localhost:5000/users").then(
                                    (res)=>{
                                        if(res.data.result){
                                            navigate("/addreservation", {state: {email: res.data.result.email, description: service.name}});
                                        }else{
                                            navigate("/login");
                                        }
                                    }
                                )
                            }
                        }><FaClock className="mr-2"/>Place appointment</button>
                    </div>
                    
                </div>
            </div>
        </div>  
    )
    ;
}
export default ServiceCard;