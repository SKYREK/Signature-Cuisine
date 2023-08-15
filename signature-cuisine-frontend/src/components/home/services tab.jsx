import React, { useEffect, useState } from "react";
import ServiceCard from "./service card";
import axios from "axios";
import { FaSearch } from "react-icons/fa";


function ServicesTab() {
    const [services, setServices] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/service")
        .then(res => {
            setServices(res.data.result)
        }
        )
    }, [])
    return (
        <div className="w-full flex flex-wrap justify-center">
            <div className="w-full flex justify-center items-center">
            <div className="h-[40px] relative w-[300px] my-[15px]">
                <div className="absolute left-0 top-0 flex items-center pl-3 h-full">
                    <FaSearch className="text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search"
      
                    className="pl-10 pr-3 py-2 w-full bg-transparent placeholder-[#114460] border border-solid border-[#114460] rounded-xl focus:outline-none focus:border-114460"
                    onChange={(e)=>{
                        if(e.target.value === ""){
                            axios.get("http://localhost:5000/service")
                            .then(res => {
                                setServices(res.data.result)
                            }
                            )
                            return
                        }else{
                            const query = e.target.value
                            const newService = services.filter((service)=>{
                                return service.name.toLowerCase().includes(query.toLowerCase())
                            }
                            )
                            setServices(newService)
                        }
                        

                    }}
                />
          </div>
            </div>
            {services.map((service) => {
                return <ServiceCard key={service._id} service={service}/>
            })
            }
            
        </div>  
    );
}
export default ServicesTab;