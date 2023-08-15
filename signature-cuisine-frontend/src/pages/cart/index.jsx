import React, { useEffect, useRef, useState } from "react";
import knifebg from "../../assets/images/knifebg.jpg";
import logo from "../../assets/images/logo.png";
import { FaAddressCard, FaBackward, FaCar, FaCcAmex, FaCcDiscover, FaCcMastercard, FaCcVisa, FaHome, FaLocationArrow, FaMoneyCheck, FaUtensils } from "react-icons/fa";
import CartCard from "../../components/cart/cart card";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../../utils/adminAuth";
import axios from "axios";
function Cart() {
    const navigate = useNavigate();
    const navigateHome =  () => {
        navigate("/home");
    }
    const [cartContent, setCartContent] = useState([]);
    const [outletList, setOutletList] = useState([]); 

    const outletRef = useRef(null)
    const addressRef = useRef(null)


    function getCart(){
        axios.get("http://localhost:5000/cart").then((res) => {
            console.log(res)
            setCartContent(res.data.result);
        }
        );
    }
    useEffect(()=>{
        const user = localStorage.getItem("userToken");
        setAuthToken(user);
        //get current user
        axios.get("http://localhost:5000/users").then((res) => {
            const user = res.data.result;
            if(user){
                getCart();
                axios.get("http://localhost:5000/outlet").then((res) => {
                    
                    setOutletList(res.data.result);
                }
                );
            }else{
                navigateHome();
            }
        })
        
    },[])
    let total = 0;
    const locationData = useRef();
    const trayData = useRef();
    const paymentData = useRef();
    return(
        <div className="App bg-center bg-cover flex flex-col items-center h-screen min-h-screen max-h-screen overflow-y-scroll  scrollbar-thin scrollbar-thumb-slate-600 scrollbar-thumb-rounded-full scrollbar-track-white" style={{ backgroundImage: `url(${knifebg})` }}>
                <div className="flex items-center justify-center bg p-3">
                    <img src={logo} className="w-72" alt="logo" />                    
                </div>
                <div className="h-[600px] flex flex-row overflow-x-scroll scrollbar-none backdrop-blur-xl rounded-2xl shadow-black shadow-2xl w-[600px]">
                    <div className="h-[600px] flex flex-col items-center min-w-[600px]" ref={trayData}>
                        <div className="text-2xl font-bold flex items-center h-[50px] "><FaUtensils className="mx-2"/> My Order Tray</div>
                        <div className="w-full h-[450px] flex flex-col items-center overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-900">
                            {cartContent.map((item , index)=>{
                                return(
                                    total+=item.qty*item.price,
                                    <CartCard key={index} food={item}  reloader={getCart}/>
                                )
                            }
                            )}
                        </div>
                        <div className="w-full h-[100px] flex flex-col justify-center items-center">
                            <span className="text-2xl font-bold flex items-center h-[50px] ">Total : Rs. {total.toFixed(2)}</span>
                            <div className="h-[50px]  w-full flex flex-row justify-center items-center">
                                <button className="w-[200px] h-[40px] bg-[#ed2647] mx-1 text-white rounded-xl flex flex-row items-center justify-center  p-1"
                                onClick={
                                    ()=>{
                                        navigateHome();
                                    }
                                }><FaHome className="m-1"/> Home</button>
                                <button className="w-[200px] h-[40px] bg-[#229a00] mx-1 text-white rounded-xl flex flex-row items-center justify-center  p-1"
                                onClick={
                                    ()=>{
                                        locationData.current.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }><FaMoneyCheck className="m-1"/> Place order</button>
                            </div>                            
                        </div>
                    </div>
                    <div className="min-w-[600px] h-[600px] flex flex-col items-center" ref={locationData}>
                        <div className="text-2xl font-bold flex items-center h-[50px] "><FaCar className="mx-2"/>Delivery information</div>
                        <div className="w-full h-[500px] flex flex-col justify-around items-center">
                            <span className="text-3xl font-bold">Total : Rs. {total.toFixed(2)}</span>
                            <div className="flex flex-row w-96 p-4 rounded-xl justify-center  items-center text-2xl font-semibold border border-[#114460]">
                                <FaLocationArrow size={50} color="#ed2647" className="mx-2"/>
                                Outlet:
                                <select className="bg-transparent w-60 text-center font-semibold text-2xl mx-3" ref={outletRef}>
                                {outletList.map((outlets) => {
                                    return <option value={outlets.id}>{outlets.name}</option>;
                                })}
                                </select>
                            </div>
                            <div className="flex flex-row w-96 p-4 rounded-xl justify-center  items-center text-2xl font-semibold border border-[#114460]">
                                <FaAddressCard size={50} color="#ed2647" className="mx-2"/>
                                Address:
                                <textarea className="h-36 font-normal text-lg mx-3 bg-transparent border border-[#114460]" ref={addressRef}></textarea>
                            </div>
                        </div>
                        <div className="w-full h-[50px] flex flex-col justify-center items-center">
                            
                            <div className="h-[50px]  w-full flex flex-row justify-center items-center">
                                <button className="w-[200px] h-[40px] bg-[#ed2647] mx-1 text-white rounded-xl flex flex-row items-center justify-center  p-1"
                                onClick={
                                    ()=>{
                                        trayData.current.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }><FaBackward className="m-1"/> Back</button>
                                <button className="w-[200px] h-[40px] bg-[#229a00] mx-1 text-white rounded-xl flex flex-row items-center justify-center  p-1"
                                onClick={
                                    ()=>{
                                        paymentData.current.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }><FaMoneyCheck className="m-1"/>Proceed to checkout</button>
                            </div>
                            
                        </div>

                    </div>
                    <div className="min-w-[600px] h-[600px] flex flex-col items-center" ref={paymentData}>
                        <div className="text-2xl font-bold flex items-center h-[50px] ">
                        <FaMoneyCheck className="mx-2" />Payment information
                        </div>
                        <div className="w-full h-[500px] flex flex-col justify-around items-center">
                        {/* Card Information UI */}
                            <div className="w-[400px] h-[500px]  rounded-lg shadow-md p-6 flex flex-col items-center justify-around">
                                <div className="flex flex-row justify-between w-full">
                                    <FaCcVisa size={40} />
                                    <FaCcMastercard size={40} />
                                    <FaCcAmex size={40} />
                                    <FaCcDiscover size={40} />
                                </div>
                                <input
                                type="text"
                                placeholder="Card Number"
                                className="w-full border border-black placeholder-black p-2 rounded-md bg-transparent"
                                />
                                <div className="flex flex-row justify-between w-full">
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        className="w-[120px] border border-black placeholder-black bg-transparent p-2 rounded-md"
                                    />
                                    <input
                                        type="text"
                                        placeholder="CVC"
                                        className="w-[120px] border p-2 rounded-md  border-black placeholder-black bg-transparent"
                                    />
                                </div>
                                <input
                                type="text"
                                placeholder="Cardholder Name"
                                className="w-full border p-2 rounded-md  border-black placeholder-black bg-transparent"
                                />
                            </div>
                        </div>
                        <div className="w-full h-[50px] flex flex-col justify-center items-center">
                            <div className="h-[50px] w-full flex flex-row justify-center items-center">
                                <button
                                className="w-[200px] h-[40px] bg-[#ed2647] mx-1 text-white rounded-xl flex flex-row items-center justify-center  p-1"
                                onClick={() => {
                                    locationData.current.scrollIntoView({ behavior: 'smooth' });
                                }}
                                >
                                <FaBackward className="m-1" /> Back
                                </button>
                                <button className="w-[200px] h-[40px] bg-[#229a00] mx-1 text-white rounded-xl flex flex-row items-center justify-center  p-1"
                                
                                onClick={
                                    ()=>{
                                        
                                        if(addressRef.current.value==="" || outletRef.current.value===""){
                                            alert("Please fill all the fields");
                                            return
                                        }
                                        const orderItems =  [];
                                        // eslint-disable-next-line array-callback-return
                                        cartContent.map((item)=>{
                                            orderItems.push({
                                                id:item.id,
                                                qty:item.qty,
                                                name :  item.name,
                                                price :item.price,                                                
                                            })
                                        })

                                        //get current user
                                        const token = localStorage.getItem("userToken");
                                        setAuthToken(token);
                                        axios.get("http://localhost:5000/users").then((res) => {
                                            const user = res.data.result;
                                            
                                            if(user){
                                                axios.post("http://localhost:5000/order",{
                                                        email:user.email,
                                                        outlet_id:outletRef.current.value,
                                                        address:addressRef.current.value,
                                                        total:total,
                                                        orderItems
                                                    }).then((res)=>{
                                                        console.log(res);
                                                        navigateHome();
                                                    }
                                                    );
                                            }
                                        }
                                        );
                                    }
                                }><FaMoneyCheck className="m-1" /> Place order
                                </button>
                            </div>
                        </div>
                    </div>
                                    
                </div>
        </div>
    )
}
export default Cart;
