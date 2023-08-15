import express from 'express';
import { addItemToCart, getCart } from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.post('/',addItemToCart)
cartRouter.get('/',getCart)

export default cartRouter;