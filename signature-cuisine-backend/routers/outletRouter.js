import express from 'express';
import { addImageToOutlet, addOutlet, deleteImageFromOutlet, deleteOutlet, getAllOutlets, getImagesFromOutletId, updateOutlet } from '../controllers/outletController.js';

const outletRouter = express.Router();

outletRouter.post("/",addOutlet)
outletRouter.get("/",getAllOutlets)
outletRouter.post("/gallery",addImageToOutlet)
outletRouter.delete("/gallery/",deleteImageFromOutlet)
outletRouter.get("/gallery/:id",getImagesFromOutletId)
outletRouter.delete("/:id",deleteOutlet);
outletRouter.put("/",updateOutlet);


export default outletRouter;