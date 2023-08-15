import React, { useEffect, useRef } from "react";
import { useLocation, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/staff_logo.png";
import knifebg from "../../../assets/images/knifebg.jpg";

import OutletTab from "../../../components/home/outlet tab";
import ServicesTab from "../../../components/home/services tab";

import AdminHomeTab from "../../../components/admin/home tab";
import AdminFoodTab from "../../../components/admin/food tab";
import AdminOutletTab from "../../../components/admin/admin outlet tab";
import AdminServicesTab from "../../../components/admin/admin service tab";
import AdminStaffTab from "../../../components/admin/staff tab";
import { FaEnvelope } from "react-icons/fa";
import StaffOrdersTab from "../../../components/staff/order tab";
import ReservationTab from "../../../components/staff/reservation tab";
import GalleryTab from "../../../components/staff/gallery tab";

function StaffHomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const navBar = useRef(null);
  const navLogo = useRef(null);

  const isActiveRoute = (routePath) => location.pathname.includes(routePath);
  useEffect(
    ()=>{
      const token = localStorage.getItem("staffToken");
      if(!token){
        navigate("/staff-login");
      }

    }
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
      <div className="flex items-center justify-center bg p-3">
        <span className="font-bold text-3xl text-[#ed2647]">Signature cuisine Branch</span>
      </div>
      <div className="sticky z-50 top-0 backdrop-blur-lg" ref={navBar}>
        <div className="flex flex-row mt-2 py-2 h-16 items-center justify-center relative shadow-xl p-3">
          <NavLink to="/staff/orders" className={isActiveRoute("orders") ? 'font-bold mx-4 border-b-[#ed2647] border-b-4' :'font-bold mx-4 hover:border-b-4 hover:border-b-[#ed2647]'}>Orders</NavLink>
          <NavLink to="/staff/reservations" className={isActiveRoute("reservations") ? 'font-bold mx-4 border-b-[#ed2647] border-b-4' : 'font-bold mx-4 hover:border-b-4 hover:border-b-[#ed2647]'}>Reservations</NavLink>
          <NavLink to="/staff/gallery" className={isActiveRoute("gallery") ? 'font-bold mx-4 border-b-[#ed2647] border-b-4' : 'font-bold mx-4 hover:border-b-4 hover:border-b-[#ed2647]'}>Gallery</NavLink>
          <button className='font-bold w-32 absolute right-1 rounded-full p-3 bg-[#ed2647] text-white'
            onClick={() => {
              localStorage.removeItem("staffToken")
              localStorage.removeItem("outlet")
              window.location.reload()
            }}>log out</button>:
          <img src={logo} className="h-[70%] hidden absolute left-5" alt="logo" ref={navLogo} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center  bg p-3 ">
        <Routes >
          <Route path="orders" element={<StaffOrdersTab/>} />
          <Route path="outlets" element={<AdminOutletTab />} />
          <Route path="services" element={<AdminServicesTab />} />          
          <Route path="gallery" element={<GalleryTab />} />
          <Route path="reservations" element={<ReservationTab/>} />
        </Routes>
      </div>
      
    </div>
  );
}

export default StaffHomePage;
