import axios from "axios";
import React from "react";
import { FaClock, FaEdit, FaTrash } from "react-icons/fa";
import { setAuthToken } from "../../utils/adminAuth";
import { useNavigate } from "react-router-dom";
//360
function AdminServiceCard(props) {
    const navigate = useNavigate();
    const {id,name,description,price,imgLink,reloader}=props;
    console.log(id)
    return (
        <div className="w-[640px] h-[460px]  relative flex flex-col overflow-hidden m-4">
            <div className="w-full h-[460px] overflow-hidden rounded-3xl">
                <img className="h-full" src={imgLink} alt="service"/>
            </div>
            <div className="w-full absolute flex flex-col pt-[360px] transition-all  duration-500 ease-in-out hover:pt-0 ">
                <div className="bg-[#114460] h-[460px] rounded-3xl">
                    <div className="h-[100px] flex flex-col justify-center items-center">
                        <span className="text-white text-3xl font-bold">{name}</span>
                    </div>
                    <div className="h-[200px] flex flex-col justify-center items-center">
                        <span className="text-white ">{description}</span>
                    </div>
                    <div className="h-[80px] flex flex-row justify-center items-center">
                        <span className="text-white text-3xl ">Rs.{price.toFixed(2)}</span>
                        <span className="text-white"></span>
                    </div>
                    <div className="h-[80px] flex flex-row justify-center items-center">
                        <button className="w-[200px] h-[50px] mx-2 bg-[#229a00] text-white rounded-xl flex flex-row items-center justify-center  p-1"
                        onClick={
                            ()=>{
                            navigate("/editservice",{state:{id,name,description,price,imgLink}})
                        }}><FaEdit className="mr-2"/>Edit service</button>
                        <button className="w-[200px] h-[50px] mx-2 bg-[#ed2647] text-white rounded-xl flex flex-row items-center justify-center  p-1"
                        onClick={
                            ()=>{
                                if(window.confirm("Are you sure you want to delete this service?")){
                                    const token = localStorage.getItem('adminToken')
                                    setAuthToken(token)
                                    axios.delete(
                                        'http://localhost:5000/service/'+id
                                    ).then((res)=>{
                                        console.log(res)
                                        reloader()
                                    })                                   
                                }
                            }

                        }><FaTrash className="mr-2"/>Remove service</button>
                    </div>
                    
                </div>
            </div>
        </div>  
    )
    ;
}
export default AdminServiceCard;