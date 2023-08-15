import express from 'express';
import userRouter from './routers/userRouter.js';
import cors from 'cors';
import authenticateUserToken from './middleware/userAuth.js';
import adminRouter from './routers/adminRouter.js';
import authenticateAdminToken from './middleware/adminAuth.js';
import foodRouter from './routers/foodRouter.js';
import outletRouter from './routers/outletRouter.js';
import serviceRouter from './routers/serviceRouter.js';
import staffRouter from './routers/staffRouter.js';
import cartRouter from './routers/cartRouter.js';
import orderRouter from './routers/orderRouter.js';
import messageRouter from './routers/messageRouter.js';
import reservationRouter from './routers/reservationRouter.js';
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(authenticateUserToken);
app.use(authenticateAdminToken)
app.use('/users', userRouter);
app.use('/admin',adminRouter);
app.use('/food',foodRouter)
app.use('/outlet',outletRouter)
app.use('/service',serviceRouter)
app.use('/staff',staffRouter)
app.use('/cart',cartRouter)
app.use('/order',orderRouter)
app.use('/message',messageRouter)
app.use('/reservation',reservationRouter)
app.listen(
    5000,
    console.log('Server running on port 5000')
)
