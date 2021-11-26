const mongoose = require('mongoose');
const config = require('./app');

module.exports = {
    databaseConnection: function(){
        mongoose.connect(config.databaseURL, {useNewUrlParser: true, useUnifiedTopology: true});
        mongoose.connection.on('error', console.error.bind(console, 'connection error'));
        mongoose.connection.once('open', function(){
            console.log('database connected successfully!')
        });
    },
}



