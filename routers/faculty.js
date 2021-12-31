const express = require('express');
const adminFacultyControllers = require('../controllers/faculty/adminFaculty');
const facultyUpdateController = require('../controllers/faculty/updateFaculty');
const deleteFacultyControler = require('../controllers/faculty/deleteFaculty');
const activateFacultyControler = require('../controllers/faculty/activateFaculty');
const searchFacultyController = require('../controllers/faculty/searchFaculty');
const registerFacultyUser = require('../controllers/faculty/registerFacultyUser');
const cors = require('cors');

module.exports = function(){
    const router = express.Router();

    router.post('/faculty-register', cors(), registerFacultyUser);
    router.get('/faculty-user', cors(), adminFacultyControllers);
    router.post('/update-user', cors(), facultyUpdateController);
    router.post('/delete-user', cors(), deleteFacultyControler);
    router.post('/activate-user', cors(), activateFacultyControler);
    router.post('/search-user', cors(), searchFacultyController);

    return router;
}