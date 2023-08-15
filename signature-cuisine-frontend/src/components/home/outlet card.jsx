import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight, FaClock, FaFacebook,  FaInstagram, FaMapMarked, FaPhone} from "react-icons/fa";

function OutletCard(props) {
    const {isOdd,outlet} = props
    const [imageArray,setImageArray] = useState([])

    useEffect(()=>{
        axios.get(
            "http://localhost:5000/outlet/gallery/"+outlet.id
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
            <div className="w-[95%] h-full flex flex-col bg-[#ed2647] justify-around">
                <span className="text-3xl font-bold flex flex-row w-full items-center justify-center text-white">{outlet.name}</span>
                <span className="text-xl flex flex-row w-full items-center justify-center text-white"><FaMapMarked className="mx-1"/>{outlet.location}</span>
                <span className="text-xl flex flex-row w-full items-center justify-center text-white"><FaPhone className="mx-1"/>{outlet.phone}</span>
                <span className="text-xl flex flex-row w-full items-center justify-center text-white"><FaClock className="mx-1"/>{outlet.phone}</span>                
                <span className="text-xl flex flex-row w-full items-center justify-center text-white"><FaFacebook className="mx-1"/>{outlet.facebook}</span>
                <span className="text-xl flex flex-row w-full items-center justify-center text-white"><FaInstagram className="mx-1"/>@{outlet.Instagram}</span>                
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
            <span className="text-3xl font-bold flex flex-row w-full items-center justify-center text-white">{outlet.name}</span>
                <span className="text-xl flex flex-row w-full items-center justify-center text-white"><FaMapMarked className="mx-1"/>{outlet.location}</span>
                <span className="text-xl flex flex-row w-full items-center justify-center text-white"><FaPhone className="mx-1"/>{outlet.phone}</span>
                <span className="text-xl flex flex-row w-full items-center justify-center text-white"><FaClock className="mx-1"/>{outlet.phone}</span>                
                <span className="text-xl flex flex-row w-full items-center justify-center text-white"><FaFacebook className="mx-1"/>{outlet.facebook}</span>
                <span className="text-xl flex flex-row w-full items-center justify-center text-white"><FaInstagram className="mx-1"/>@{outlet.Instagram}</span>         
            </div>
            
        </div>}

        
    </div>
  );
}
export default OutletCard;