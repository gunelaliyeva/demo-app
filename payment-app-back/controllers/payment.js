const express = require('express');

const Category = require('../models/category');
const CustomField = require('../models/field');
const Provider = require('../models/provider');

const errorRes = (code) => {
    return {
        error: {
            code: code,
            message: code === 1 ? "Service is temporarily unavailable" : "Required parameter is missing"
        }
    };
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
        res.json(errorRes(1));
    }
}

const sendPairRequest = (req, res) => {
    const pair = new Pair({
        k: req.body.k,
        v: req.body.v
    });
    pair.save().then(result => {
        res.status(201).json({
            k: result.k,
            v: result.v
        });
    }).catch(err => {
        console.log(err);
    })
}

const senFieldRequest = (req, res) => {
    const field = new CustomField({
        type: req.body.type,
        label: req.body.label,
        options: req.body.options
    });
    field.save().then(result => {
        res.status(201).json({
            type: result.type,
            label: result.label,
            options: result.options
        });
    }).catch(err => {
        res.status(400).json(errorRes(Number(err.message.substring(err.message.length - 1))));
    })
}

const sendCategoryRequest = (req, res) => {
    const category = new Category({
        name: req.body.name,
        providers: req.body.providers
    });
    category.save().then(result => {
        res.status(201).json({
            name: result.name,
            providers: result.providers
        });
    }).catch(err => {
        res.status(400).json(errorRes(Number(err.message.substring(err.message.length - 1))));
    })
}

const sendProviderRequest = (req, res) => {
    const provider = new Provider({
        name: req.body.name,
        fields: req.body.fields
    });
    provider.save().then(result => {
        res.status(201).json({
            name: result.name,
            fields: result.fields
        });
    }).catch(err => {
        // console.log(err);
        res.json(err);
    })
}

exports.makeNewPayment = (req, res, next) => {
    // sendPairRequest(req, res);
    // senFieldRequest(req, res);
    // sendProviderRequest(req, res);
    sendCategoryRequest(req, res);
}