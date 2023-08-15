import Reservation from "../models/reservation.js";
import { getAllReservationBYOutlet } from "../models/reservation.js";

export async function getReservationByOutlet(req, res){
    try{
        const { id } = req.params;
        const result = await getAllReservationBYOutlet(id);
        res.json({
            result
        })
    }catch(err){
        res.json({
            err
        })
    }
}

export async function addReservation(req, res){
    const { email, description, time, outlet_id } = req.body;
    try{
        const reservation = new Reservation(0, email, description, time, outlet_id);
        const result = await reservation.save();
        res.json({
            result
        })
    }catch(err){
        res.json({
            err
        })
    }
}