import React from "react";
import dp  from "../../assets/images/chain_dp.png";

function MessageHead(props){
    const {email , select} = props
    return(
        <div className="w-full h-20 min-h-[80px] flex flex-row border border-black my-1 cursor-pointer"
        onClick={
            ()=>{
                select(email);
            }
        }>
            <div className="w-1/4 flex flex-row h-full items-center justify-center">
                <img src={dp} className="w-10" alt="logo" />
            </div>
            <div className="w-3/4 flex flex-row h-full items-center justify-center">
                {email}
            </div>
        </div>
    );
}
export default MessageHead;