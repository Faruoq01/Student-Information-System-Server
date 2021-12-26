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
}, {collection: 'departmentUsers'});

const myDB = mongoose.connection.useDb('department');

const department = myDB.model('RegisterDepartment', user);

module.exports = {
    model: department
}

