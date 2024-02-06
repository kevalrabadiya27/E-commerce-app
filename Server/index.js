const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

const userRoute = require('./src/routes/userroute')
const authRoute = require("./src/routes/auth")
const productRoute = require("./src/routes/productroute")
const cartRoute = require("./src/routes/cartroute")
const orderRoute = require("./src/routes/orderroute")
const stripeRoute = require("./src/routes/stripe");
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("DB connection successfull");
}).catch((err) => console.log("error in DB" + err))

app.use(cors())
app.use(express.json())

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

// default route
app.get('/', (req, res) => {
    res.send('<center><h2>WELCOME TO X-CART API</h2></center>');
})

app.listen(process.env.PORT || 6050, () => {
    console.log(`Backend is running on 6050`);
})

module.exports = app;