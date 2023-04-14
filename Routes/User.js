const express = require('express');
const { handleSignup, handleSignIn, getUserData, updateUser } = require('../Controller/User');
const decodeToken = require('../Middleware/isValidToken');
const Router = express.Router();

Router.post('/signup', handleSignup);

Router.post('/signin', handleSignIn);

Router.get('/data', decodeToken, getUserData);

Router.patch('/update', decodeToken, updateUser);


module.exports = Router;