const RegisterFaculty = require('../../../models/faculty/registerModel');
const jwt = require('jsonwebtoken');
const config = require('../../../config/app');

const deleteFacultyControler = async(req, res) => {

    try{
        const {email} = req.body;
        const token = req.header('authorization').split(' ')[1];
        jwt.verify(token, config.appKey, function(error, done){
            if(error) return res.status(401).json({
                error:{ 
                    name:'TokenExpiredError', 
                    message:'Authentication failed'
                }
            });
            if(done){
                RegisterFaculty.model.findOneAndRemove({email: email}, function(error, users){
                    if(error) return res.status(500).json({Error: 'Serve error'});
                    res.status(200).json({
                        code: 200,
                        message: 'success',
                        user: users
                    })
                });
            }
        });
    }catch (e){
        return res.status(500).json({ message: e.message })
    }
}

module.exports = deleteFacultyControler;