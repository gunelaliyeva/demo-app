const express = require('express');

const Category = require('../models/category');
const FieldModel = require('../models/field');
const {PairModel} = require('../models/pair');
// const ProviderModel = require('../models/category');

exports.getPaymentCategories = (req, res, next) => {
    res.status(200).json({message: 'OK'});
}

exports.makeNewPayment = (req, res, next) => {
    const field = new FieldModel({
        type: req.body.type,
        label: req.body.label,
    });
    field.save().then(result => {
        res.status(201).json({
            type: result.type,
            label: result.label,
            options: '61f16b1d311744b91e0b380f'
        });
    }).catch(err => {
        console.log(err);
    })
}