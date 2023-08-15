import React from "react";

function ReservationCard(props){
    const{reservation} = props;
    return(
        <div className="w-[350px] bg-[#ed2647] relative flex flex-col py-10 m-5">
            <span  className="w-full text-center text-white font-bold">
                Reservation ID: {reservation.id}
            </span>
            <span  className="w-full text-center text-white font-bold">
                Customer email: {reservation.email}
            </span>    
            <span  className="w-full text-center text-white font-bold">
                Type: {reservation.description}
            </span>          
            <span  className="w-full text-center text-white font-bold">
                Time: {reservation.time.split("T")[0]} {reservation.time.split("T")[1].split(".")[0]}
            </span>          
        </div>
    )
}
export default ReservationCard;