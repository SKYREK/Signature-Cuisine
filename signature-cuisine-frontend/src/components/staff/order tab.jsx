import React, { useEffect, useState } from "react";
import StaffOrderCard from "./order card";
import axios from "axios";


function StaffOrdersTab() {
  const [orderList , setOrderList] = useState([])
  useEffect(()=>{
    const outletid = localStorage.getItem("outlet")
    console.log(outletid)
    axios.get("http://localhost:5000/order/"+outletid).then(
      (res)=>{
        console.log(res)
        setOrderList(res.data.result)
      }
    )
  },[])

  return (
    <div className="w-full flex flex-wrap justify-center">
        {
          orderList.map((item,index)=>{
            return <StaffOrderCard order={item} key={index}/>
          })
        }
    </div>  
    
  )
  ;
}
export default StaffOrdersTab;