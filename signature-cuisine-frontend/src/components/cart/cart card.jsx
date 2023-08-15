import React from "react";
import { FaAngleDown, FaAngleUp, FaPlus } from "react-icons/fa";
import { setAuthToken } from "../../utils/adminAuth";
import axios from "axios";

function CartCard(props){
    const {food , reloader}  = props;
    return(
        <div className="h-[100px] w-[500px]  flex flex-row border border-[#114460] rounded-3xl items-center p-1 my-1">
            <div className="h-full w-[100px] overflow-hidden">
                <img src={food.image_link} className="h-full" alt="item" />                
            </div>
            <div className="flex flex-col h-full w-[300px] justify-center items-center">
                <span className="w-full font-semibold">{food.name}</span>
                <span className="w-full ">Rs.{food.price.toFixed(2)}</span>
            </div>
            <div className="flex flex-col  justify-center  items-center w-[40px] h-full">
                <FaAngleUp className="text-[#114460] cursor-pointer"
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
                                                reloader();
                                            }
                                            );
                
                                    }
                                }
                                );
                            }     
                        }/>
                    <input type="number" value={food.qty} className="w-[40px] h-[40px] rounded-xl border border-[#114460] bg-transparent" />
                <FaAngleDown className="text-[#114460] cursor-pointer"
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
                                                quantity:-1
                                            }).then((res)=>{
                                                console.log(res);
                                                reloader();
                                            }
                                            );
                
                                    }
                                }
                                );
                            }     
                        }/>
            </div>
            
            <span className="w-[100px] text-center">Rs.{(food.qty * food.price)}</span>
        </div>
    )
}
export default CartCard;