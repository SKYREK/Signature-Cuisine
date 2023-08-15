import React, { useEffect, useState } from "react";
import OutletCard from "./outlet card";
import axios from "axios";

function OutletTab() {
  const [outletList, setOutletList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/outlet").then((res) => {
      if (res.data.result) {
        setOutletList(res.data.result);
      }
    });
  }, []);

  return (
    <div className="w-full flex flex-col">
        {
          outletList.map((outlet,index)=>{
            return <OutletCard outlet={outlet} key={outlet.id} isOdd={
              index%2===0?true:false
            }/>
          }
          )
        }
        
        

    </div>
  );
}
export default OutletTab;