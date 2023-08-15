
import express from 'express';
import { addFood, deleteFood, getAllFoods, updateFood } from '../controllers/foodController.js';
const foodRouter = express.Router();

foodRouter.post('/',addFood)
foodRouter.get('/',getAllFoods)
foodRouter.delete('/:id',deleteFood);
foodRouter.put('/',updateFood);
export default foodRouter;