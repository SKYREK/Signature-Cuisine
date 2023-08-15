import axios from "axios";
import React, { useEffect, useState } from "react";

function StaffOrderCard(props){
    
    const {order} = props;
    const [itemList, setItemList] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:5000/order/items/"+order.id).then(
            (res)=>{
                console.log(res)
                setItemList(res.data.result)
            }

        )
    },[])
    return (
        <div className="w-[350px] bg-[#114460] relative flex flex-col py-10 m-5">
            <span  className="w-full text-center text-white font-bold">
                Order ID: {order.id}
            </span>
            <span  className="w-full text-center text-white font-bold">
                Customer email: {order.email}
            </span>
            <span  className="w-full text-center text-white font-bold">
                Customer Address: {order.address}
            </span>
            <span  className="w-full text-center text-white font-bold">
                {order.time.split("T")[0]} {order.time.split("T")[1].split(".")[0]}
            </span>
            <br />
            <div className="w-full flex flex-col justify-center items-center">  
                {
                    itemList.map(
                        (item)=>{
                            return <span className="text-white font-bold">{item.name} x {item.qty}</span>
                        }
                    )
                    
                }              
            </div>
        </div>
    );
}

export default StaffOrderCard;
