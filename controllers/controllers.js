const User = require('../models/model');
const jwt = require('jsonwebtoken');


// Create Token
const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) =>{
    return jwt.sign({id}, 'secret key', {
        expiresIn: maxAge
    });
}

// handle errors
const handleErrors = (error) =>{
    const errors = { email:'',username:'',password:'',confirmPassword:''};

    if(error.code == 11000){
        if((Object.keys(error.keyPattern)).includes('email')){
            errors['email']= 'email already registered';
        }
        else{
            errors['username'] = 'Username already exists';
        }
        return errors;
    }

    if(error.message=='Email not exists'){
        errors['email']='Email doesnot exist';
    }
    if(error.message=='Incorrect password'){
        errors['password']='Incorrect password';
    }

    if (error.message.includes('user validation failed')){
        Object.values(error.errors).forEach(({properties}) =>{
            errors[properties.path] = errors[properties.message];
        })
    }
    return errors;
}



module.exports.login_get = (req,res) =>{
    res.render('login');
}

module.exports.login_post = async (req,res) =>{
    const {email,password} = req.body;

    try {
        const user = await User.login(email,password);
        const token = createToken(user._id);
        res.cookie('jwt',token,{ httpOnly:true, maxAge : maxAge});
        res.status(200).json({user:user._id});
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({errors});
        console.log(error);
    }
}

module.exports.signup_get = (req,res) =>{
    res.render('signup');
}

module.exports.signup_post = async (req,res) =>{
   const {email,username,password,confirmPassword} = req.body;

   try {
       const user = await User.create({email,username,password,confirmPassword});
       const token = createToken(user._id);
       res.cookie('jwt',token, {httpOnly:true, expiresIn: maxAge*1000});
       res.status(201).json({user: user._id});
   } catch (error) {
       const errors = handleErrors(error);
       res.status(400).json({errors});
       console.log(error);
   }
}

module.exports.logout = (req,res)=>{
    res.cookie('jwt','',{expiresIn:1});
    res.redirect('/');
}
