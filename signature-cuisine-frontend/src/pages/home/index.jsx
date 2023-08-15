import React, { useEffect, useRef, useState } from "react";
import { useLocation, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import knifebg from "../../assets/images/knifebg.jpg";
import { FaComments, FaList, FaShoppingCart } from "react-icons/fa";


import HomeTab from "../../components/home/home tab";
import OutletTab from "../../components/home/outlet tab";
import ServicesTab from "../../components/home/services tab";
import FoodTab from "../../components/home/food tab";
import { setAuthToken } from "../../utils/adminAuth";
import axios from "axios";

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const navBar = useRef(null);
  const navLogo = useRef(null);

  const isActiveRoute = (routePath) => location.pathname === routePath;
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(
    () => {
      const user = localStorage.getItem("userToken");
      setAuthToken(user);
      axios.get("http://localhost:5000/users").then((res) => {
        
        setCurrentUser(res.data.result);
      }
      );
    }, []
  )

  return (
    <div className="App bg-center bg-cover h-screen min-h-screen max-h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-600 scrollbar-thumb-rounded-full scrollbar-track-white" style={{ backgroundImage: `url(${knifebg})` }}
      onScroll={(e) => {
        console.log(e.target.scrollTop);
        if (e.target.scrollTop === 0) {
          console.log(e.target.scrollTop);
          navBar.current.classList.remove("backdrop-blur-3xl");
          navBar.current.classList.add("backdrop-blur-lg");
          navLogo.current.classList.add("hidden");
        } else {
          navBar.current.classList.remove("backdrop-blur-lg");
          navBar.current.classList.add("backdrop-blur-3xl");
          navLogo.current.classList.remove("hidden");
        }
      }}>
      <div className="flex items-center justify-center bg p-3">
        <img src={logo} className="w-72" alt="logo" />
      </div>
      <div className="sticky z-50 top-0 backdrop-blur-lg" ref={navBar}>
        <div className="flex flex-row mt-2 py-2 h-16 items-center justify-center relative shadow-xl p-3">
          <NavLink to="/" className={isActiveRoute("/") ? 'font-bold mx-4 border-b-[#ed2647] border-b-4' :'font-bold mx-4 hover:border-b-4 hover:border-b-[#ed2647]'}>Home</NavLink>
          <NavLink to="/outlets" className={isActiveRoute("/outlets") ? 'font-bold mx-4 border-b-[#ed2647] border-b-4' : 'font-bold mx-4 hover:border-b-4 hover:border-b-[#ed2647]'}>Outlets</NavLink>
          <NavLink to="/services" className={isActiveRoute("/services") ? 'font-bold mx-4 border-b-[#ed2647] border-b-4' : 'font-bold mx-4 hover:border-b-4 hover:border-b-[#ed2647]'}>Services</NavLink>
          <NavLink to="/foods" className={isActiveRoute("/foods") ? 'font-bold mx-4 border-b-[#ed2647] border-b-4' : 'font-bold mx-4 hover:border-b-4 hover:border-b-[#ed2647]'}>Foods</NavLink>
          {!currentUser?<button className='font-bold w-32 absolute right-1 rounded-full p-3 bg-[#ed2647] text-white'
            onClick={() => {
              navigate("/login");
            }}>login</button>:
            <div className="absolute right-1 flex flex-row">
            
              <button className='mx-1 font-bold h-12 w-12 right-1 rounded-full p-3 bg-[#ed2647] text-white flex items-center justify-center'
              onClick={() => {
                navigate("/cart");
              }}><FaShoppingCart/></button>
              <button className='mx-1 font-bold h-12 w-12 right-1 rounded-full p-3 bg-[#ed2647] text-white flex items-center justify-center'
              onClick={() => {
                navigate("/cart");
              }}><FaList/></button>
              <button className='mx-1 font-bold w-32 right-1 rounded-full p-3 bg-[#ed2647] text-white'
              onClick={() => {
                localStorage.removeItem("userToken");
                //reload window
                window.location.reload();
              }}>logout</button>
              </div>  
                          
              }
          <img src={logo} className="h-[70%] hidden absolute left-5" alt="logo" ref={navLogo} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center  bg p-3 ">
        <Routes>
          <Route path="/" element={<HomeTab />} />
          <Route path="/outlets" element={<OutletTab />} />
          <Route path="/services" element={<ServicesTab />} />
          <Route path="/foods" element={<FoodTab />} />
        </Routes>
      </div>
      <div className="fixed z-[100] w-20 h-20 flex shadow-lg shadow-black items-center rounded-full justify-center bottom-4 right-4 bg-[#229a00]">
        <button className="rounded-full p-2 text-white"
          onClick={() => {
            if(currentUser)
              navigate("/queries");
            else
              navigate("/login");
          }}>
          <FaComments size={36} />
        </button>
      </div>
    </div>
  );
}

export default HomePage;
