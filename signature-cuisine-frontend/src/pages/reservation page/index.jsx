import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaAt, FaCalendar, FaHome, FaIdCard,  FaTable,  FaUser, FaUsers } from "react-icons/fa";

import logo from "../../assets/images/logo.png";
import knifebg from "../../assets/images/knifebg.jpg";
import axios from "axios";
import { setAuthToken } from "../../utils/adminAuth";

function AddReservationPage() {
  const [branchList, setBranchList] = useState([]);

  const [selectedBranch, setSelectedBranch] = useState("");
  const [date , setDate] = useState("");
    const {email , description } = useLocation().state;
  useEffect(() => {
    axios
      .get("http://localhost:5000/outlet")
      .then((res) => {
        setBranchList(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  // Function to handle the form submission
  const handleFormSubmit = () => {

    if(selectedBranch.length < 1){
      alert("Please select a branch");
      return;
    }    
    // Process the form data here (e.g., send it to the server)
    const token = localStorage.getItem("adminToken");
    setAuthToken(token);
    axios.post("http://localhost:5000/reservation", {
        description,
        time :    date,
        email,
        outlet_id : selectedBranch
    }).then((res) => {
      
      if (res.data.error) {
        alert(res.data.error);
        navigate("/login");
      } else {        
        navigate("/services");
      }
    }
    );
  };

  return (
    <div className="App bg-center bg-cover h-screen min-h-screen max-h-screen flex flex-col" style={{ backgroundImage: `url(${knifebg})` }}>
      <div className="flex items-center justify-center bg p-3">
        <img src={logo} className="w-72" alt="logo" />
      </div>
      <div className="flex flex-col items-center justify-center mt-5 bg p-3 ">
        <div className="w-[500px] flex flex-col items-center backdrop-blur-xl shadow-2xl rounded-3xl ">
          <div className="h-[60px] flex flex-row items-center text-[#ed2647] text-3xl font-semibold">
            <FaTable className="mx-2" /> {description}
          </div>
          <div className="relative h-[40px] w-[300px] my-[15px]">
            <div className="absolute left-0 top-0 flex items-center pl-3 h-full">
              <FaHome className="text-gray-400" />
            </div>
            <select
              className="pl-10 pr-3 py-2 w-full bg-transparent placeholder-[#114460] border border-solid border-[#114460] rounded-xl focus:outline-none focus:border-114460"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="">Select Branch</option>
              {branchList.map((outlets) => {
                return <option value={outlets.id}>{outlets.name}</option>;
              })}
            </select>
          </div>
          <div className="relative h-[40px] w-[300px] my-[15px]">
            <div className="absolute left-0 top-0 flex items-center pl-3 h-full">
              <FaCalendar className="text-gray-400" />
            </div>
            <input
              type="datetime-local"
              placeholder="Enter age"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="pl-10 pr-3 py-2 w-full bg-transparent placeholder-[#114460] border border-solid border-[#114460] rounded-xl focus:outline-none focus:border-114460"
            />
          </div>


          <div className="h-100 flex flex-row justify-around items-center mb-4">
            <button className="w-40 my-1 mx-2 bg-[#ed2647] text-white rounded-xl py-2" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button className="w-40 my-1 mx-2 bg-[#114460] text-white rounded-xl py-2" onClick={handleFormSubmit}>
              Add Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddReservationPage;
