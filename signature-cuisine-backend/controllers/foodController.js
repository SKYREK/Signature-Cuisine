import Food, { deleteFoodFromDB } from "../models/food.js";
import { getAllFoodFromDB } from "../models/food.js";
export async function addFood(req, res){
    if(req.admin){
        const { name, price, imageLink } = req.body;
        try{
            const food = new Food(0,name, price, imageLink);
            const result = await food.save();
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
export async function getAllFoods(req, res){
    try{
        const result = await getAllFoodFromDB();
        res.json({
            result
        })
    }catch(err){
        res.json({
            err
        })
    }
}

export async function deleteFood(req, res){
        if(req.admin){        
        const { id } = req.params;
        
        try{
            const result = await deleteFoodFromDB(id);
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

export async function updateFood(req, res){
    if(req.admin){
        const { id, name, price, imageLink } = req.body;
        try{
            const food = new Food(id,name, price, imageLink);
            const result = await food.update();
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



