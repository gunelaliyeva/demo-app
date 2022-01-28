const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    number: {
        type: String,
        required: true
    },
    exp_month: {
        type: String,
        required: true
    },
    exp_year: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
         required: true
    }
});

module.exports = mongoose.model('Card', cardSchema);