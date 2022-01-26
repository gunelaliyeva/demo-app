const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {PairSchema, PairModel} = require('./pair');

const customFieldSchema = new Schema({
    type: {
        type: Number,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    options: [
        {
            type: Schema.Types.ObjectId,
            ref: 'PairModel'
        }
    ],
});

module.exports = mongoose.model('CustomFieldModel', customFieldSchema);