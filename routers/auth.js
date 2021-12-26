const express = require('express');
const cors = require('cors');
const loginController = require('../controllers/Auth/Login');
const registerController = require('../controllers/Auth/Register');

module.exports = function(){
    const router = express.Router();

    router.post('/login', cors(), loginController);
    router.post('/register', cors(), registerController);
    
    return router;
}