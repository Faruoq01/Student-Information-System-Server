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
}, {collection: 'lecturers'});

const myDB = mongoose.connection.useDb('department');

const lecturers = myDB.model('RegisterLecturers', user);

module.exports = {
    model: lecturers
}

