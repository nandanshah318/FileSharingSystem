const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const router = require('./routes/route');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/file', router);

// REST API
app.get('/', (req, res) => {
  res.send('<h1>Welcome to FileSharing app</h1>');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on the port: ${port}`);
});
