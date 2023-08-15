
import React, { useEffect, useState } from "react";
import ReservationCard from "./reservation card";
import axios from "axios";

function ReservationTab(){
    const [reservationList , setReservationList] = useState([])
    useEffect(
        ()=>{
            const outletid = localStorage.getItem("outlet")
            console.log(outletid)
            axios.get("http://localhost:5000/reservation/"+outletid).then(
                (res)=>{
                    console.log(res)
                    setReservationList(res.data.result)
                }
            )
        },[]
    )
    return(
    <div className="w-full flex flex-wrap justify-center">
        {
            reservationList.map((item,index)=>{
                return <ReservationCard reservation={item} key={index}/>
            }
            )

        }
       
    </div>  
    )
}
export default ReservationTab;