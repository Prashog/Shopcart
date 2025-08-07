const express = require('express');
const app = express();

require('dotenv').config();
require('./db.js');

const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));

const bodyparser = require('body-parser')
app.use(bodyparser.json());

const authRouter = require('./routes/authRouter.js')
const userRouter = require('./routes/userRouter.js')
const adminProductRouter = require('./routes/adminProductRouter.js')
const categoriesRouter = require('./routes/categoryRouter.js')
const orderRouter = require('./routes/orderRouter.js')
const adminOrderRouter = require('./routes/adminOrderRouter.js')
const productsRouter = require('./routes/productsRouter.js')
const reviewRouter = require('./routes/reviewRouter')
const wishlistRouter = require('./routes/wishlistRouter')
const addressRouter = require('./routes/addressRouter.js')
const adminUserManagementRouter = require('./routes/adminUserManagementRouter.js')
const adminServicesRouter = require('./routes/adminServices.js')
const contackRouter = require('./routes/contactRouter.js')

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/admin/products', adminProductRouter)
app.use('/categories', categoriesRouter)
app.use('/orders', orderRouter)
app.use('/admin/orders', adminOrderRouter)
app.use('/products', productsRouter)
app.use('/reviews', reviewRouter)
app.use('/wishlist', wishlistRouter)
app.use('/address', addressRouter)
app.use('/admin/users', adminUserManagementRouter)
app.use('/admin', adminServicesRouter)
app.use('/contact', contackRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`)
})