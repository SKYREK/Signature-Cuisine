import expres from 'express';
import { deleteStaff, getAllStaff, loginStaff, registerStaff, updateStaff } from '../controllers/staffController.js';

const staffRouter = expres.Router();

staffRouter.post('/',registerStaff)
staffRouter.get("/",getAllStaff)
staffRouter.delete('/:username',deleteStaff);
staffRouter.put('/',updateStaff)
staffRouter.post('/login',loginStaff)
export default staffRouter;