const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pairSchema = new Schema({
    k: Schema.Types.Mixed,
    v: Schema.Types.Mixed
});

module.exports.PairModel = mongoose.model('PairModel', pairSchema);
module.exports.PairSchema = pairSchema;