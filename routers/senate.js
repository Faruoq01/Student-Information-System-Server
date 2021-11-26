const express = require('express');
const registerController = require('../controllers/senate/register');
const loginController = require('../controllers/senate/login');

module.exports = function(){
    const router = express.Router();

    router.post('/register', registerController);
    router.post('/login', loginController);

    return router;
}