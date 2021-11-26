const express = require('express');
const RegisterModel = require('../models/senate/registerModel');

module.exports = function(){
    const router = express.Router();

    router.post('/register', (req, res, next) => {

        let saveData = new RegisterModel.model({
            'firstname': req.body.firstname,
            'lastname': req.body.lastname,
            'username': req.body.username,
            'title': req.body.title,
            'position': req.body.position,
            'image': null,
            'email': req.body.email
        }); console.log(saveData)
        
        saveData.save(function(error, result){
            if(error) throw error;

            if(result){
                res.json(result);
            }
        })
    });

    return router;
}