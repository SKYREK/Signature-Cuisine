import Message, { getAllMessagedUsers, getAllMessagesByEmail } from "../models/message.js";

export async function sendMessageAdmin(req,res){
    if(req.admin){
        const { email , content } = req.body;
        try{
            const message = new Message(email , "admin"  , content , new Date())
            const result = message.save();
            res.json({
                result
            })
        }catch(err){
            res.json({
                err
            })
        }
    }
}
export async function sendMessageUser(req,res){
    if(req.user){
        const { content } = req.body;
        try{
            const message = new Message(req.user.userEmail , "user"  , content , new Date())
            const result = message.save();
            res.json({
                result
            })
        }catch(err){
            console.log(err)
            res.json({
                err
            })
        }
    }
}
export async function getMessages(req,res){        
    try{
        const result = await getAllMessagesByEmail(req.params.email)
        res.json({
            result
        })
    }catch(err){
        
        res.json({
            err
        })
    }    
}
export async  function getUserMessages(req,res){
    
    if(req.admin){
        try{
            const result = await getAllMessagedUsers()
            res.json({
                result
            })
        }catch(err){
            
            res.json({
                err
            })
        }
    }else{
        
    }
}