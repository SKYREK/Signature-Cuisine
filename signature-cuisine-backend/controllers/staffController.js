import { getAllFoodFromDB } from "../models/food.js";
import Staff, { getAllStaffFromDB } from "../models/staff.js";

export async function registerStaff(req, res) {
    if(req.admin){
        const { username, fullName, age , outlet , nic } = req.body;
        console.log(req.body)
        const staff = new Staff(username, fullName, age , outlet , nic);
        try{
            const result = await staff.save();
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
export async function getAllStaff(req, res){
    try{
        const result = await getAllStaffFromDB();
        res.json({
            result
        })
    }catch(err){
        res.json({
            err
        })
    }
}
export function deleteStaff(req,res){
    if(req.admin){
        const { username } = req.params;
        const staff = new Staff(username);
        
        
        try{
            const result = staff.delete();
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
export async function updateStaff(req, res){
    if(req.admin){
        const { username, fullName, age , outlet , nic } = req.body;
        const staff = new Staff(username, fullName, age , outlet , nic);
        try{
            const result = await staff.update();
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
export async function loginStaff(req, res){
    const { username, nic } = req.body;
    const staff = new Staff(username,"fullName","age","outlet",nic);
    try{
        const result = await staff.login();
        res.json({
            result
        })
    }catch(err){
        res.json({
            err
        })
    }
}
