// grab the things we need
var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);

var Currency = mongoose.Types.Currency;
var Schema = mongoose.Schema;

// create a schema
var promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    label: {type: String, default: '', required: false },
    image: {type: String, required: false},
    price: {type: Currency, requred: false} 
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Promotions = mongoose.model('Promotion', promotionSchema);

// make this available to our Node applications
module.exports = Promotions;
