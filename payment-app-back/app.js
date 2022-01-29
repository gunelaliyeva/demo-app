const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const paymentRoutes = require('./routes/payment');

const app = express();

app.use(bodyParser.json());
dotenv.config();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/payment', paymentRoutes);

mongoose
    .connect(
        `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.z9pbo.mongodb.net/payment-app?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(process.env.PORT || 8080);
    })
    .catch(err => {
        console.log(err);
    });
