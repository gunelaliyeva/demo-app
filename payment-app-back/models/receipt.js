const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const receiptSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    details: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Pair'
        }
    ],
    amount: {
        value: {
            type: String,
            required: true
        },
        currency: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('Receipt', receiptSchema);