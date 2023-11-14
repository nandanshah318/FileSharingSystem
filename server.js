const dotenv = require("dotenv");
const connectDB = require('./config/db');
const express = require("express");
const cors = require('cors');
const router = require("./routes/route")

dotenv.config();
connectDB();


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/file", router);

//rest api
app.get("/", (req, res) => {
    res.send("<h1>Welcome to FileSharing app</h1>");
  });

const port = process.env.PORT||8080;
app.listen(port,() => {
    console.log(`Server is Running on the port: ${port}`);
} );