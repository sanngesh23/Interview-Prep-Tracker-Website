const express = require("express");
const mongoose = require('mongoose');
const route = require('./routes/routes');
const cookieParser = require('cookie-parser'); 
const {auth,checkUser} = require('./middlewares/authentication');


const app = express();
app.use(express.json());
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(cookieParser());

dbURI = 'mongodb+srv://sanngesh:sanngesh@cluster0.dzujp.mongodb.net/Node?retryWrites=true&w=majority';
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.get('*', checkUser);

app.get('/', (req,res)=>{
    res.render('home');
});

app.get('/arrays',auth, (req,res) =>{
  res.render('arrays');
});

app.use(route); 
//app.get
// app.get('/set-cookies',(req,res)=>{
//   res.cookie('newUser',false);
//   res.cookie('olduser',true,{maxAge:1000*60*60*24});
//   res.send("<h2>yayy you got a cookie</h2>");
// });

// app.get('/read-cookies',(req,res)=>{
//    const cookies=req.cookies;
//    console.log(cookies);
//    res.json(cookies);
// })




