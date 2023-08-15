import Service, { getAllServiceFromDB } from "../models/service.js";

export async function registerService(req,res){
    const { name,description, price, imageLink } = req.body;
    if(req.admin){
        const service = new Service(0,name,description ,price, imageLink);
        try{
            const result = await service.save();
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
export async function getAllServices(req, res){
    try{
        const result = await getAllServiceFromDB();
        res.json({
            result
        })
    }catch(err){
        res.json({
            err
        })
    }
}
export async function deleteService(req, res){
    if(req.admin){        
        const { id } = req.params;
        
        try{
            const result = await new Service(id).delete();
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
            err: "Not admin"
        })
    }
}
export async function updateService(req, res){
    if(req.admin){
        const { id, name,description, price, imageLink } = req.body;
        try{
            const service = new Service(id,name,description, price, imageLink);
            const result = await service.update();
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
