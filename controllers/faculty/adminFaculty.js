const jwt = require('jsonwebtoken');
const RegisterFaculty = require('../../models/faculty/registerModel');
const config = require('../../config/app');

const adminFacultyControllers = async(req, res) => {
    const token = req.header('authorization').split(' ')[1];
    jwt.verify(token, config.appKey, function(error, done){
        if(error) if(error) return res.status(401).json({
            error:{ 
                name:'TokenExpiredError', 
                message:'Authentication failed'
            }
        });
        if(done){
            RegisterFaculty.model.find(function(error, users){
                if(error) return res.status(500).json({Error: 'Serve error'});
                res.status(200).json({
                    'code': 200,
                    'status': 'success',
                    'admin': users
                })
            });
        }
    });
}

module.exports = adminFacultyControllers;