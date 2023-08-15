
import express  from 'express';
import { getOrderItemsFromOrderId, getOrdersFromOutletId, placeOrder } from '../controllers/orderController.js';

const  orderRouter = express.Router();

orderRouter.post('/',placeOrder);
orderRouter.get('/:id',getOrdersFromOutletId);
orderRouter.get('/items/:id',getOrderItemsFromOrderId);

export default orderRouter;