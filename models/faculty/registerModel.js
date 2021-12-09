const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    faculty: String,
    dean: String,
    username: String,
    password: String,
    title: String,
    position: String,
    activeStatus: String,
    userType: String,
    image: String|null,
    email: String,
}, {collection: 'facultyUsers'});

const myDB = mongoose.connection.useDb('faculty');

const faculty = myDB.model('RegisterFaculty', user);

module.exports = {
    model: faculty
}

