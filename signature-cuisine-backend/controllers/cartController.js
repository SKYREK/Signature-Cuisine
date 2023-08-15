import CartItem, { getUserCart } from "../models/cartItem.js";

export async function addItemToCart(req, res) {
    const { id, quantity } = req.body;
    if(req.user){

        const cart = new CartItem(req.user.userEmail, id, quantity);
        try{
            const result = await cart.save();
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
export async function getCart(req, res) {
    if(req.user){
        try{
            const result = await getUserCart(req.user.userEmail);
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