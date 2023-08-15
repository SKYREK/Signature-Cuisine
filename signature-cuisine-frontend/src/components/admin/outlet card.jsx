import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight, FaClock, FaEdit, FaFacebook,  FaInstagram, FaMapMarked, FaPhone, FaTrash} from "react-icons/fa";
import { setAuthToken } from "../../utils/adminAuth";
import { useNavigate } from "react-router-dom";

function AdminOutletCard(props) {
    const {isOdd , name , id , location , phone , openHrs , facebook , instagram  , reloader } = props
    const navigate = useNavigate()
    const[imageArray,setImageArray] = useState([]);
    useEffect(()=>{
        axios.get(
            "http://localhost:5000/outlet/gallery/"+id
        ).then((res)=>{
            let arr = []
            res.data.result.map(
                (item,index)=>{
                    arr[index] = item.image_link
                }
            )            
            setImageArray(arr)
        })
    },[])
    const containerRef = useRef();
    const refArray = [];
    imageArray.forEach(
        (item,index)=>{
            refArray[index] = React.createRef();
        }
    )
    let currentImage = 0;
    function nextImage() {
        if (currentImage < imageArray.length - 1) {
          currentImage++;
          const scrollAmountX = refArray[currentImage].current.offsetLeft;
          const container = containerRef.current;
          container.scrollTo({
            left: scrollAmountX,
            behavior: "smooth",
          });
        }
      }
      
      function prevImage() {
        if (currentImage > 0) {
          currentImage--;
          const scrollAmountX = refArray[currentImage].current.offsetLeft;
          const container = containerRef.current;
          container.scrollTo({
            left: scrollAmountX,
            behavior: "smooth",
          });
        }
      }
  return (
    <div className="w-full h-[500px] relative flex flex-row overflow-hidden mb-36">
        <div className={`absolute ${isOdd?'right-0':''} flex flex-row h-[500px] justify-between pt-[1000px] items-center overflow-hidden transition-all duration-500 ease-in-out hover:pt-0 w-3/4 z-50`}>

        
        <FaChevronCircleLeft size={50} className="cursor-pointer m-2"
            onClick={()=>{
                prevImage();
        }}/>
        
        <FaChevronCircleRight size={50} className="cursor-pointer m-2"
            onClick={()=>{
                nextImage();
        }}/>
        

        </div>
        {isOdd&&<div className="w-1/4 h-full flex flex-col justify-center items-center ">
            <div className="w-[95%] h-full flex flex-col bg-[#114460] justify-around">
                <span className="text-3xl font-bold flex flex-row w-full items-center justify-center text-white">{name}</span>
                <span className="text-xl flex flex-row w-full items-center justify-center text-white"><FaMapMarked className="mx-1"/> {location}</span>
                <span className="text-xl flex flex-row w-full items-center justify-center text-white"><FaPhone className="mx-1"/> {phone}</span>
                <span className="text-xl flex flex-row w-full items-center justify-center text-white"><FaClock className="mx-1"/>{openHrs}</span>                
                <span className="text-xl flex flex-row w-full items-center justify-center text-white"><FaFacebook className="mx-1"/>{facebook}</span>
                <span className="text-xl flex flex-row w-full items-center justify-center text-white"><FaInstagram className="mx-1"/>@{instagram}</span>  
                <div className="h-[40px] flex flex-row">
                    <button className="w-48 mx-2 h-full bg-[#229a00] text-white flex items-center justify-center rounded-xl"><FaEdit className="mx-1"/> Edit info</button>
                    <button className="w-48 mx-2 h-full bg-[#ed2647] text-white flex items-center justify-center rounded-xl"
                    onClick={()=>{
                        console.log("clicked")
                        const token = localStorage.getItem('adminToken');        
                        setAuthToken(token);
                        if(token===null){
                            navigate("/admin-login");
                            return
                        }
                        if(window.confirm("Are you sure you want to remove this outlet?")===false){
                            return
                        }
                        axios.delete(
                            "http://localhost:5000/outlet/"+id
                        ).then(
                            (res)=>{
                                if(res.data.result){
                                    reloader();
                                }
                            }
                        )
                    }}><FaTrash className="mx-1"/> Remove outlet</button>
                </div>              
            </div>
            
        </div>}

        <div className="w-3/4 h-full flex flex-row relative overflow-x-scroll scrollbar-none" ref={containerRef}>
            
            
            {
                imageArray.map((imageLink, index) => {
                    return(
                        <div className="min-w-full h-full relative" ref={refArray[index]}>
                            <img src={imageLink} className="w-full h-full absolute" alt="food"/>
                            <div className="w-full h-full absolute flex backdrop-blur-xl flex-col justify-center items-center z-20">
                                <img src={imageLink} className=" h-full absolute z-40" alt="food"/>
                            </div>
                        </div>  
                    )
                })
            }      
           
        </div>
       {!isOdd&&<div className="w-1/4 h-full flex flex-col justify-center items-center ">
            <div className="w-[95%] h-full flex flex-col bg-[#114460] justify-around">
                <span className="text-3xl font-bold flex flex-row w-full items-center justify-center text-white">{name}</span>
                <span className="text-xl flex flex-row w-full items-center justify-center text-white"><FaMapMarked className="mx-1"/> {location}</span>
                <span className="text-xl flex flex-row w-full items-center justify-center text-white"><FaPhone className="mx-1"/> {phone}</span>
                <span className="text-xl flex flex-row w-full items-center justify-center text-white"><FaClock className="mx-1"/>{openHrs}</span>                
                <span className="text-xl flex flex-row w-full items-center justify-center text-white"><FaFacebook className="mx-1"/>{facebook}</span>
                <span className="text-xl flex flex-row w-full items-center justify-center text-white"><FaInstagram className="mx-1"/>@{instagram}</span>   
                
                <div className="h-[40px] flex flex-row">
                    <button className="w-48 mx-2 h-full bg-[#229a00] text-white flex items-center justify-center rounded-xl"
                    onClick={()=>{
                        navigate("/editoutlet", {state:{id,name,location,phone,openHrs,facebook,instagram,imageArray}})
                    }}
                    ><FaEdit className="mx-1"/> Edit info</button>
                    <button className="w-48 mx-2 h-full bg-[#ed2647] text-white flex items-center justify-center rounded-xl"
                    onClick={()=>{
                        const token = localStorage.getItem('adminToken');        
                        setAuthToken(token);
                        if(token===null){
                            navigate("/admin-login");
                            return
                        }
                        if(window.confirm("Are you sure you want to remove this outlet?")===false){
                            return
                        }
                        axios.delete(
                            "http://localhost:5000/outlet/"+id
                        ).then(
                            (res)=>{                                
                                console.log(res)
                                if(res.data.result){
                                    reloader();
                                }
                            }
                        )
                    }}><FaTrash className="mx-1"/> Remove outlet</button>
                </div>                
            </div>
            
        </div>}

        
    </div>
  );
}
export default AdminOutletCard;