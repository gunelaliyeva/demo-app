const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProviderSchema = require('./provider');

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    providers: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Provider'
            }
        ],
        required: true
    }
});

module.exports = mongoose.model('Category', categorySchema);