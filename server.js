const dotenv = require("dotenv");
const connectDB = require('./config/db');

dotenv.config();
connectDB();

console.log("Hi this is testing from Nandan SHah- Second Push");