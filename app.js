import express from "express";

import productRouter from "./routes/productRoutes.js";
import userRoute from "./routes/userRoutes.js";

import './config/db.js'

// const checkApikey = require('./loggerMiddleware')
const app = express();
const port = 3000;

// lấy ip thực (not reverse proxy)
app.set('trust proxy', 1)

app.use(express.json());


app.use('/api/users', userRoute);

app.use('/api/products', productRouter)


// app.get('/hello', (req, res) => {
//     return res.json({ message: "Hello" })
// })

// Yêu cầu máy chủ lắng nghe ở cổng 3000
app.listen(port, () => {
    console.log('Server dang chay tai cong 3000 (http://localhost:3000)');
});