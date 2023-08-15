import Order, { getOrderItemsForOrder, getOrdersForOutlet } from "../models/order.js";

export async function placeOrder(req , res){
    if(req.user){
        const { address, time, outlet_id, total , orderItems } = req.body;
        
        try{
            const order  = new Order(0,req.user.userEmail,address,outlet_id,total , orderItems);
            const result = await order.save()
            res.json({
                result
            })
        }catch(err){
            
            res.json({
                err
            })
        }
    }else{
        
        res.json({
            err: "Not logged in"
        })
    }
}
export async function getOrdersFromOutletId(req , res){
    
    const { id } = req.params;
    try{
        const result = await getOrdersForOutlet(id)
        
        res.json({
            result
        })
    }catch(err){
        res.json({
            err
        })
    }

}
export async  function getOrderItemsFromOrderId(req, res){
    const { id } = req.params;
    try{
        const result = await getOrderItemsForOrder(id)
        res.json({
            result
        })
    }catch(err){
        res.json({
            err
        })
    }

}