const express = require('express');
const registerController = require('../controllers/senate/register');
const loginController = require('../controllers/senate/login');
const cors = require('cors');

module.exports = function(){
    const router = express.Router();

    router.post('/register', cors(), registerController);
    router.post('/login', cors(), loginController);

    return router;
}