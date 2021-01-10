const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

//  schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: [ true, 'Email already registered'],
        required: [ true, 'Enter an email'],
        validate: [ isEmail , 'Enter a valid email']
    },
    username: {
        type:  String,
        unique: [true, 'Username already exists'],
        minlength: [4, ' Username too small'],
        required: [ true , 'Enter a username']
    },
    password: {
        type: String,
        required: [ true, 'Enter password'],
        minlength: [6 , 'Password too small']
    },
    confirmPassword: {
        type: String,
        required: [ true, 'Enter password'],
        minlength: [6 , 'Password too small']
    }
});

// hashing passwords
userSchema.pre('save',async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password , salt);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword , salt);
    next();
});


userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        if(auth){
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Email not exists');
}

const User = mongoose.model('user', userSchema);

module.exports = User;
