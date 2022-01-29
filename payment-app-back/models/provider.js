const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const providerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    fields: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'CustomField'
            }
        ],
        required: true
    }
});

module.exports = mongoose.model('Provider', providerSchema);