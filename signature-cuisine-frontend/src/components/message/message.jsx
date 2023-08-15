import React from "react";

function Message(props){
    const{isOwn} = props;
    return(
        <div className={`w-full flex my-4 flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
            <p className={`text-left  max-w-[75%] rounded-xl p-3 ${isOwn ? 'bg-[#229a00]' : 'bg-[#234c65]'}   text-white`}>
                {props.content}
            </p>
        </div>
    );
}
export default Message;