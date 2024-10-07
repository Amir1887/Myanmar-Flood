const express = require('express');
const cors = require('cors');
require('dotenv').config();


const getFloodsRouter = require('./routes/floodRoutes/getFloodsRoute');
const postFloodsRouter = require('./routes/floodRoutes/postFloodsRoute');



const app = express();
const port = process.env.PORT || 4000;



// Middleware and other setups
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));

app.use('/', getFloodsRouter);
app.use('/', postFloodsRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });