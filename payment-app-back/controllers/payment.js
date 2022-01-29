const express = require('express');

const Category = require('../models/category');
const Receipt = require('../models/receipt');
const Provider = require('../models/provider');
const CustomField = require('../models/field');

const validationErrorTemp = {name: "ValidationError"};
const date = new Date();

const errorRes = (res, err) => {
    let statusCode, code;
    if (err.name === "ValidationError") {
        code = 2;
        statusCode = 400;
    } else {
        code = 1;
        statusCode = 500;
    }
    res.status(statusCode).json({
        error: {
            code: code,
            message: code === 1 ? "Service is temporarily unavailable" : "Required parameter is missing"
        }
    });
}

const validateAmount = (amount) => {
    const {value, currency} = amount;
    const numVal = Number(value);
    return (isNaN(value) || numVal < 1 || numVal > 5000);

}

const validateProvider = async (pId, res) => {
    try {
        const provider = await Provider.findById(pId);
        return !provider;
    } catch (e) {
        errorRes(res, validationErrorTemp);
    }
}

const validateCardNumber = (number) => (number.length !== 20 || isNaN(number));

const validateExpMonth = (month) => (month.length !== 2 || isNaN(month) || month < 1 || month > 12);

const validateExpYear = (year) => (year.length !== 2 || isNaN(year) || year > 30 || year < date.getFullYear()%100);

const validateCvv = (cvv) => (cvv.length !== 3 || isNaN(cvv));

const validateCard = (card) => {
    const {number, exp_month, exp_year, cvv} = card;
    return (validateCardNumber(number) || validateExpMonth(exp_month) || validateExpYear(exp_year) || validateCvv(cvv));
}

exports.getPaymentCategories = async (req, res, next) => {
    try {
        const categories = await Category.find().populate({
            path: 'providers',
            populate: {
                path: 'fields',
                populate: {path: 'options'}
            }
        });
        res.status(200).json(categories);
    } catch (e) {
        console.log(e)
        errorRes(res, e);
    }
}

exports.makeNewPayment = async (req, res, next) => {
    try {
        const {providerId, fields, amount, card} = req.body;
        if(validateAmount(amount)|| validateCard(card) || await validateProvider(providerId)) {
            errorRes(res, validationErrorTemp);
           return;
        }

        const newPayment = await Receipt.create({
            date: date.toISOString().split('.')[0],
            details: fields,
            amount: amount
        });
        const result = await newPayment.save();
        res.status(200).json(result);
    } catch (e) {
        errorRes(res, e);
    }
}