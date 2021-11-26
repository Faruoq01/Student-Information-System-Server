const express = require('express');

module.exports = function(){
    const router = express.Router();

    router.get('/register', (req, res, next) => {
        console.log('hello guys')
    });

    return router;
}