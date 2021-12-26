const express = require('express');
const adminFacultyControllers = require('../controllers/faculty/adminFaculty');
const facultyUpdateController = require('../controllers/faculty/updateFaculty');
const deleteFacultyControler = require('../controllers/faculty/deleteFaculty');
const activateFacultyControler = require('../controllers/faculty/activateFaculty');
const searchFacultyController = require('../controllers/faculty/searchFaculty');
const cors = require('cors');

module.exports = function(){
    const router = express.Router();

    router.get('/admin-faculty', cors(), adminFacultyControllers);
    router.post('/update-faculty', cors(), facultyUpdateController);
    router.post('/delete-faculty', cors(), deleteFacultyControler);
    router.post('/activate-faculty', cors(), activateFacultyControler);
    router.post('/search-faculty', cors(), searchFacultyController);

    return router;
}