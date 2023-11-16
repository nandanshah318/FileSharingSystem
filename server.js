const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const router = require('./routes/route');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to FileSharing app</h1>');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log('Incoming request:', req.method, req.url);
  res.status(500).send('Something went wrong!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on the port: ${port}`);
});
