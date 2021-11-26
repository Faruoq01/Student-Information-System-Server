const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    title: String,
    position: String,
    image: String|null,
    email: String,
}, {collection: 'adminUsers'});

const Model = mongoose.model('RegisterModel', user);

module.exports = {
    model: Model
}

