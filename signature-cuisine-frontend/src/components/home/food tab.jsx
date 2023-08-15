import React, { useEffect, useState } from "react";
import FoodCard from "./food card";
import axios from "axios";

function FoodTab() {
  const[foods, setFoods] = useState([])
  useEffect(() => {
    axios.get("http://localhost:5000/food")
    .then(res => {
      setFoods(res.data.result)
    })
  }, [])
  return (
    <div className="w-full flex flex-wrap justify-center">
      {
        foods.map((food) => {
          return <FoodCard key={food._id} food={food}/>
        }
        )
      }

    </div>  
  )
  ;
}
export default FoodTab;