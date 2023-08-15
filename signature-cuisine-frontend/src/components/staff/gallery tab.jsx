import axios from "axios";
import React, { useEffect, useRef, useState } from "react";  
import { FaPlus } from "react-icons/fa";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
function GalleryTab(props){
    
    const[galleryArray, setGalleryArray] = useState([])
    const[image , setImage] = useState(null)
    const imgRef  =  useRef(null)
    const loadImages = ()=>{
        const id =  localStorage.getItem("outlet")
        axios.get("http://localhost:5000/outlet/gallery/"+id).then(
            (res)=>{
                //console.log(res)
                setGalleryArray(res.data.result)
            }
        )
    }
    useEffect(()=>{
        const id =  localStorage.getItem("outlet")
        axios.get("http://localhost:5000/outlet/gallery/"+id).then(
            (res)=>{
                //console.log(res)
                setGalleryArray(res.data.result)
            }
        )
    },[])

    return(
        <div className="w-full flex flex-wrap justify-center relative">
            {
                galleryArray.map((item, index) => (
                    <div key={index} className="w-[350px] h-[350px] m-5">
                        <img className="w-full h-full object-cover" src={item.image_link} alt="gallery" />
                    </div>
                ))
            }
            <input type="file" className="hidden" id="image" onChange={(e)=>{
                setImage(e.target.files[0])
                if(!e.target.files[0]){
                    return;
                }
                const storageRef = firebase.storage().ref();
                const fileRef = storageRef.child(e.target.files[0].name);
                fileRef.put(e.target.files[0]).then((snapshot) => {
                  
                  //get snapshot url
                  snapshot.ref.getDownloadURL().then((url) => {
                    const imgLink = url;
                    console.log(imgLink)
                    const outlet = localStorage.getItem("outlet")
                    axios.post(
                        "http://localhost:5000/outlet/gallery",
                        {
                            id : outlet,
                            imgLink
                        }
                    ).then(
                        (res) => {
                            console.log(res)
                            loadImages()
                        }

                    )
                   
                  });
            
                  
                }
                ).catch((err) => {
                  console.log(err);
                }
                );

            }
            } ref={imgRef}/>
            <div className="fixed z-50 w-20 h-20 flex shadow-lg shadow-black items-center rounded-full justify-center bottom-4 right-4 bg-[#229a00]">
                <button className="rounded-full p-2 text-white"
                onClick={
                    ()=>{
                        
                    }
                }>
                <FaPlus size={36} 
                onClick={
                    ()=>{
                        
                        imgRef.current.click()

                    }
                }/>
                </button>
            </div>
        </div>  
    )
}
export default GalleryTab;