import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaDollarSign, FaHamburger, FaList, FaServicestack } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import logo from "../../../assets/images/admin_logo.png";
import knifebg from "../../../assets/images/knifebg.jpg";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { setAuthToken } from "../../../utils/adminAuth";
import axios from "axios";

function AddServicePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const navBar = useRef(null);
  const navLogo = useRef(null);
  const goAdminService = () => {
    navigate("/admin/services");
  };
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  // Function to handle the file upload
  const onDrop = (acceptedFiles) => {
    // Assuming only one file is allowed, you can access it using acceptedFiles[0]
    setUploadedImage(acceptedFiles[0]);
  };

  // Use the useDropzone hook to get Dropzone functionality
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Function to handle form submission
  const handleAddService = () => {
    if (serviceName === "") {
      alert("Please enter a valid service name");
      return;
    }
  
    if (price === "") {
      alert("Please enter a valid price");
      return;
    }
  
    if (isNaN(parseFloat(price))) {
      alert("Price must be a valid number");
      return;
    }
  
    if (description === "") {
      alert("Please enter a valid description");
      return;
    }
  
    if (!uploadedImage) {
      alert("Please upload an image");
      return;
    }
    
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(uploadedImage.name);
    fileRef.put(uploadedImage).then((snapshot) => {
      
      //get snapshot url
      snapshot.ref.getDownloadURL().then((url) => {
        const imageLink = url;
        
        const token = localStorage.getItem('adminToken');        
        setAuthToken(token);
        axios.post(
          "http://localhost:5000/service/",
          {
            name : serviceName,
            description,
            price,
            imageLink : imageLink
          }
        ).then(
          (res) => {
            console.log(res)
            goAdminService();
          }
        )
      });

      
    }
    ).catch((err) => {
      console.log(err);
    }
    );
    // Process the form data here (e.g., save to Firebase or send to the server)
    console.log("Service Name:", serviceName);
    console.log("Price:", price);
    console.log("Description:", description);
    console.log("Image:", uploadedImage);
    // Redirect or perform any other actions after adding the service
  };

  return (
    <div className="App bg-center bg-cover h-screen min-h-screen max-h-screen flex flex-col" style={{ backgroundImage: `url(${knifebg})` }}>
      <div className="flex items-center justify-center bg p-3">
        <img src={logo} className="w-72" alt="logo" />
      </div>
      <div className="flex flex-col items-center justify-center mt-5 bg p-3 ">
        <div className="w-[500px] flex flex-col items-center backdrop-blur-xl shadow-2xl rounded-3xl h-[550px]">
          <div className="h-[60px] flex flex-row items-center text-[#ed2647] text-3xl font-semibold">
            <FaServicestack className="mx-2" /> Add Service
          </div>
          <div className="h-[40px] relative w-[300px] my-[15px]">
            <div className="absolute left-0 top-0 flex items-center pl-3 h-full">
              <FaHamburger className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Enter service name"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="pl-10 pr-3 py-2 w-full bg-transparent placeholder-[#114460] border border-solid border-[#114460] rounded-xl focus:outline-none focus:border-114460"
            />
          </div>
          <div className="relative h-[40px] w-[300px] my-[15px]">
            <div className="absolute left-0 top-0 flex items-center pl-3 h-full">
              <FaDollarSign className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="pl-10 pr-3 py-2 w-full bg-transparent placeholder-[#114460] border border-solid border-[#114460] rounded-xl focus:outline-none focus:border-114460"
            />
          </div>
          <div className="relative h-[40px] w-[300px] my-[15px]">
            <div className="absolute left-0 top-0 flex items-center pl-3 h-full">
              <FaList className="text-gray-400" />
            </div>
            <textarea
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="pl-10 pr-3 py-2 w-full bg-transparent placeholder-[#114460] border border-solid border-[#114460] rounded-xl focus:outline-none focus:border-114460"
            />
          </div>
          <div className="flex flex-row w-full justify-center items-center h-[200px]">
            {uploadedImage && (
              <div className="w-[150px] h-[150px] bg-center bg-cover rounded-lg mx-3" style={{ backgroundImage: `url(${URL.createObjectURL(uploadedImage)})` }} />
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
          <div className="h-100 flex flex-row justify-around items-center">
            <button className="w-40 my-1 mx-2 bg-[#ed2647] text-white rounded-xl py-2">Cancel</button>
            <button className="w-40 my-1 mx-2 bg-[#114460] text-white rounded-xl py-2" onClick={handleAddService}>Add Service</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddServicePage;
