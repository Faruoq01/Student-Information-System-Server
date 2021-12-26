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
}, {collection: 'students'});

const myDB = mongoose.connection.useDb('department');

const students = myDB.model('RegisterStudents', user);

module.exports = {
    model: students
}

