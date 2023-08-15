import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaClock, FaFacebook, FaHome, FaInstagram, FaMapMarked, FaPhone } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import logo from "../../../assets/images/admin_logo.png";
import knifebg from "../../../assets/images/knifebg.jpg"
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { setAuthToken } from "../../../utils/adminAuth";
import axios from "axios";
function AddOutletPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const goAdminOutlet = () => {
    navigate("/admin/outlets");
  };
  const navBar = useRef(null);
  const navLogo = useRef(null);

  // State for the input fields
  const [outletName, setOutletName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [openDuration, setOpenDuration] = useState("");
  const [facebookPage, setFacebookPage] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  // Function to handle the file upload
  const onDrop = (acceptedFiles) => {
    // Assuming only one file is allowed, you can access it using acceptedFiles[0]
    setUploadedImage(acceptedFiles[0]);
  };

  // Use the useDropzone hook to get Dropzone functionality
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Function to handle form submission
  const handleFormSubmit = () => {
    if (outletName === "") {
      alert("Enter valid outlet name");
      return;
    }
  
    if (locationName === "") {
      alert("Enter valid location");
      return;
    }
  
    if (phoneNumber === "") {
      alert("Enter valid phone number");
      return;
    }
  
    if (openDuration === "") {
      alert("Enter valid open duration text");
      return;
    }
  
    if (facebookPage === "") {
      alert("Enter valid Facebook page name");
      return;
    }
  
    if (instagramId === "") {
      alert("Enter valid Instagram ID");
      return;
    }
  
    // Check if an image has been uploaded
    if (!uploadedImage) {
      alert("Please upload an image");
      return;
    }
  
    //get adminToken from localstorage
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(uploadedImage.name);
    fileRef.put(uploadedImage).then((snapshot) => {
      
      //get snapshot url
      snapshot.ref.getDownloadURL().then((url) => {
        const imageLink = url;
        
        const token = localStorage.getItem('adminToken');        
        setAuthToken(token);
        axios.post(
          "http://localhost:5000/outlet",
          {
            name : outletName,
            location : locationName,
            phone : phoneNumber,
            openHrs : openDuration,
            facebook : facebookPage,
            instagram : instagramId,
            imgLink : imageLink
          }
        ).then(
          (res) => {
            
            goAdminOutlet();
          }
        )
      });

      
    }
    ).catch((err) => {
      console.log(err);
    }
    );
  };
  

  return (
    <div className="App bg-center bg-cover  flex flex-col" style={{ backgroundImage: `url(${knifebg})` }}>
      <div className="flex items-center justify-center bg p-3">
        <img src={logo} className="w-72" alt="logo" />
      </div>
      <div className="flex flex-col items-center justify-center mt-5 bg p-3 ">
        <div className="w-[500px] flex flex-col items-center backdrop-blur-xl shadow-2xl rounded-3xl ">
          <div className="h-[60px] flex flex-row items-center text-[#ed2647] text-3xl font-semibold">
            <FaHome className="mx-2" /> Add Outlet
          </div>
          <div className="h-[40px] relative w-[300px] my-[15px]">
            <div className="absolute left-0 top-0 flex items-center pl-3 h-full">
              <FaHome className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Enter outlet name"
              value={outletName}
              onChange={(e) => setOutletName(e.target.value)}
              className="pl-10 pr-3 py-2 w-full bg-transparent placeholder-[#114460] border border-solid border-[#114460] rounded-xl focus:outline-none focus:border-114460"
            />
          </div>
          <div className="relative h-[40px] w-[300px] my-[15px]">
            <div className="absolute left-0 top-0 flex items-center pl-3 h-full">
              <FaMapMarked className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Enter location"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="pl-10 pr-3 py-2 w-full bg-transparent placeholder-[#114460] border border-solid border-[#114460] rounded-xl focus:outline-none focus:border-114460"
            />
          </div>
          <div className="relative h-[40px] w-[300px] my-[15px]">
            <div className="absolute left-0 top-0 flex items-center pl-3 h-full">
              <FaPhone className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="pl-10 pr-3 py-2 w-full bg-transparent placeholder-[#114460] border border-solid border-[#114460] rounded-xl focus:outline-none focus:border-114460"
            />
          </div>
          <div className="relative h-[40px] w-[300px] my-[15px]">
            <div className="absolute left-0 top-0 flex items-center pl-3 h-full">
              <FaClock className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Enter open duration text"
              value={openDuration}
              onChange={(e) => setOpenDuration(e.target.value)}
              className="pl-10 pr-3 py-2 w-full bg-transparent placeholder-[#114460] border border-solid border-[#114460] rounded-xl focus:outline-none focus:border-114460"
            />
          </div>
          <div className="relative h-[40px] w-[300px] my-[15px]">
            <div className="absolute left-0 top-0 flex items-center pl-3 h-full">
              <FaFacebook className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Enter facebook page name"
              value={facebookPage}
              onChange={(e) => setFacebookPage(e.target.value)}
              className="pl-10 pr-3 py-2 w-full bg-transparent placeholder-[#114460] border border-solid border-[#114460] rounded-xl focus:outline-none focus:border-114460"
            />
          </div>
          <div className="relative h-[40px] w-[300px] my-[15px]">
            <div className="absolute left-0 top-0 flex items-center pl-3 h-full">
              <FaInstagram className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Enter instagram id"
              value={instagramId}
              onChange={(e) => setInstagramId(e.target.value)}
              className="pl-10 pr-3 py-2 w-full bg-transparent placeholder-[#114460] border border-solid border-[#114460] rounded-xl focus:outline-none focus:border-114460"
            />
          </div>
          <div className="flex flex-row w-full justify-center items-center h-[200px]">
            {uploadedImage && (
              <div
                className="w-[150px] h-[150px] bg-center bg-cover rounded-lg mx-3"
                style={{ backgroundImage: `url(${URL.createObjectURL(uploadedImage)})` }}
              />
            )}
            <div className="w-[300px] h-[150px] border-2 border-dashed border-gray-500 rounded-lg my-5" {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-gray-600 text-lg">Drop the image here ...</p>
              ) : (
                <p className="text-gray-600 text-lg">Drag and drop an image here, or click to select an image</p>
              )}
            </div>
          </div>
          <div className="h-100 flex flex-row justify-around items-center mb-2">
            <button className="w-40 my-1 mx-2 bg-[#ed2647] text-white rounded-xl py-2" onClick={() => navigate(-1)}>Cancel</button>
            <button className="w-40 my-1 mx-2 bg-[#114460] text-white rounded-xl py-2" onClick={handleFormSubmit}>Add Outlet</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddOutletPage;
