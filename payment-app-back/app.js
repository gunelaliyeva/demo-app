const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const paymentRoutes = require('./routes/payment');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/payment', paymentRoutes);

// app.use((error, req, res, next) => {
//     console.log(error);
//     const status = error.statusCode || 500;
//     const message = error.message;
//     const data = error.data;
//     res.status(status).json({ message: message, data: data });
// });

mongoose
    .connect(
        'mongodb+srv://admin:admin@cluster0.z9pbo.mongodb.net/payment-app?retryWrites=true&w=majority'
    )
    .then(() => {
        app.listen(8080);
    })
    .catch(err => console.log(err));
