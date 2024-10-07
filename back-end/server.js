const express = require('express');
const cors = require('cors');
require('dotenv').config();


const getFloodsRouter = require('./routes/floodRoutes/getFloodsRoute');
const postFloodsRouter = require('./routes/floodRoutes/postFloodsRoute');
const getUserRouter = require('./routes/userRoutes/getUserRoute');
const postUserRouter = require('./routes/userRoutes/postUserRoute');
const getDonationsRouter = require('./routes/dontationRoutes/getDonationsRoute');
const postDonationsRouter = require('./routes/dontationRoutes/postDonationsRoute');
const getAlertRouter = require('./routes/alertRoutes/getAlertRoute');
const postAlertRouter = require('./routes/alertRoutes/postAlertRoute');
const getCommuinityResRouter = require('./routes/commuinityResilienceRoutes/getCommuinityResRoute');
const postCommuinityResRouter = require('./routes/commuinityResilienceRoutes/postCommuinityResRoute');



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
app.use('/', getUserRouter);
app.use('/', postUserRouter);
app.use('/', getDonationsRouter);
app.use('/', postDonationsRouter);
app.use('/', getAlertRouter);
app.use('/', postAlertRouter);
app.use('/', getCommuinityResRouter);
app.use('/', postCommuinityResRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });