let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let BalancedSchema = new Schema({
    user: String,
    message: String,
    attempts: Number
});

BalancedSchema.methods.increaseAttempts = function(){
    this.attempts = this.attempts + 1;
    return this;
}

module.exports = mongoose.model('balanced', BalancedSchema);