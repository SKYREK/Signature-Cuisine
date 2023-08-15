import express from 'express';
import { getMessages, getUserMessages, sendMessageAdmin, sendMessageUser } from '../controllers/messageController.js';

const messageRouter = express.Router();

messageRouter.post('/',sendMessageUser);
messageRouter.post('/admin',sendMessageAdmin);
messageRouter.get('/list',getUserMessages)
messageRouter.get('/:email',getMessages);


export default messageRouter;