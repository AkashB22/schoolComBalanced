let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let BalancedSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    message: String,
    attempts: Number
});

BalancedSchema.plugin(uniqueValidator);

BalancedSchema.methods.increaseAttempts = function(){
    this.attempts = this.attempts + 1;
}

module.exports = mongoose.model('balanced', BalancedSchema);