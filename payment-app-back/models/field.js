const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let typeVal;

const customFieldSchema = new Schema({
    id: Schema.Types.ObjectId,
    type: {
        type: Number,
        required: true,
        validate: [val => {
            typeVal = val;
            return true;
        }]
    },
    label: {
        type: String,
        required: true,
    },
    options:  [
            {
                "k": Schema.Types.Mixed,
                "v": Schema.Types.Mixed
            }
        ],
});
customFieldSchema.path('options').validate(val => {
    return Number(typeVal) === 4 ? val.length > 0 : true}, '2');

model = mongoose.model("CustomField", customFieldSchema);

module.exports = model;