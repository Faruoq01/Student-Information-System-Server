const express = require('express');
const registerController = require('../controllers/senate/register');
const loginController = require('../controllers/senate/login');
const adminControllers = require('../controllers/senate/admin');
const adminUpdateController = require('../controllers/senate/updateAdmin');
const deleteUserControler = require('../controllers/senate/deleteUserControler');
const cors = require('cors');

module.exports = function(){
    const router = express.Router();

    router.post('/register', cors(), registerController);
    router.post('/login', cors(), loginController);
    router.get('/admin', cors(), adminControllers);
    router.post('/update', cors(), adminUpdateController);
    router.post('/delete', cors(), deleteUserControler);

    return router;
}