const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    firstname: String,
    lastname: String,
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

const facultyUsers = myDB.model('RegisterFacultyUsers', user);

module.exports = {
    model: facultyUsers
}

