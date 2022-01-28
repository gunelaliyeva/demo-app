const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const receiptSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: new Date().toISOString().split('.')[0]
    },
    details: [
        {
            k: Schema.Types.Mixed,
            v: Schema.Types.Mixed
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