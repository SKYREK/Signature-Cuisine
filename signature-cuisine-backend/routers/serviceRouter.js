import express from 'express';
import { deleteService, getAllServices, registerService, updateService } from '../controllers/serviceController.js';

const serviceRouter = express.Router();

serviceRouter.post('/',registerService)
serviceRouter.get('/',getAllServices)
serviceRouter.delete('/:id',deleteService);
serviceRouter.put('/',updateService);
export default serviceRouter