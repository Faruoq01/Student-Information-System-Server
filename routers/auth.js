const express = require('express');
const cors = require('cors');
const loginController = require('../controllers/Auth/Login');

module.exports = function(){
    const router = express.Router();
    router.post('/login', cors(), loginController);
    return router;
}