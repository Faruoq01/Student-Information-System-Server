const mongoose = require('mongoose');

mongoose.connect('');

mongoose.connection.on('error', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', function(){
    console.log('database connected successfully!')
});