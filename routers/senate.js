// senate admin imports
const express = require('express');
const registerController = require('../controllers/senate/auth/register');
const loginController = require('../controllers/senate/auth/login');
const adminControllers = require('../controllers/senate/admin/admin');
const adminUpdateController = require('../controllers/senate/admin/updateAdmin');
const deleteUserControler = require('../controllers/senate/admin/deleteUserControler');
const activateUserControler = require('../controllers/senate/admin/activateUserControler');
const searchAdminController = require('../controllers/senate/admin/searchAdminController');

// senate faculty imports
const registerFacultyController = require('../controllers/senate/faculty/registerFacultyController');
const adminFacultyControllers = require('../controllers/senate/faculty/adminFacultyController');
const facultyUpdateController = require('../controllers/senate/faculty/updateFacultyController');
const deleteFacultyControler = require('../controllers/senate/faculty/deleteFacultyController');
const activateFacultyControler = require('../controllers/senate/faculty/activateFacultyController');
const searchFacultyController = require('../controllers/senate/faculty/searchFacultyController');
const cors = require('cors');

module.exports = function(){
    const router = express.Router();

    // senate admin routes
    router.post('/register', cors(), registerController);
    router.post('/login', cors(), loginController);
    router.get('/admin', cors(), adminControllers);
    router.post('/update', cors(), adminUpdateController);
    router.post('/delete', cors(), deleteUserControler);
    router.post('/activate-user', cors(), activateUserControler);
    router.post('/search-admin', cors(), searchAdminController);

    // faculty routes
    router.post('/register-faculty', cors(), registerFacultyController);
    router.get('/admin-faculty', cors(), adminFacultyControllers);
    router.post('/update-faculty', cors(), facultyUpdateController);
    router.post('/delete-faculty', cors(), deleteFacultyControler);
    router.post('/activate-faculty', cors(), activateFacultyControler);
    router.post('/search-faculty', cors(), searchFacultyController);

    return router;
}