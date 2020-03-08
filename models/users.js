let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    DOB: String,
    username: {
        type: String,
        unique: true
    },
    role: String
});
UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', async function(next){
    let user = this;

    if(user.isModified('password')){
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(this.password, salt);

        this.password = hash;
        next();
    }
    
    return next();
});

UserSchema.methods.verifyPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateJWT = function(){
    return jwt.sign({
        id: this.id
    }, 'mySecret', {
        expiresIn: '1h'
    });
}

module.exports = mongoose.model('user', UserSchema);

