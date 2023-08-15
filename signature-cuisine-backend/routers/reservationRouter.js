import express from 'express';
import { addReservation, getReservationByOutlet } from '../controllers/reservationController.js';
const reservationRouter = express.Router();

reservationRouter.get('/:id', getReservationByOutlet)
reservationRouter.post('/', addReservation)

export default reservationRouter