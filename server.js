const dotenv = require("dotenv");
const connectDB = require('./config/db');
const express = require("express");

dotenv.config();
connectDB();


const app = express();
app.use(express.json());
app.use("/api/file",require("./routes/route"));
const port = process.env.PORT||8080;
app.listen(port,() => {
    console.log(`Server is Running on the port: ${port}`);
} );
console.log("Hi this is testing from Nandan SHah- Second Push");