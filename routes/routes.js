const { Router } = require('express');
const authController = require('../controllers/controllers');
const route = Router();

route.get('/login', authController.login_get);
route.post('/login', authController.login_post)
route.get('/signup', authController.signup_get);
route.post('/signup', authController.signup_post);
route.get('/logout',authController.logout);

module.exports = route;

