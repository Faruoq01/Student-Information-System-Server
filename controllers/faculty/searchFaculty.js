const RegisterFaculty = require('../../models/faculty/registerModel');
const jwt = require('jsonwebtoken');
const config = require('../../config/app');

const searchFacultyController = async(req, res) => {

    try{
        const {email} = req.body;
        const token = req.header('authorization').split(' ')[1];
        jwt.verify(token, config.appKey, function(error, done){
            if(error) if(error) return res.status(500).json({Error: 'Authentication failed'});
            if(done){
                RegisterFaculty.model.findOne({email: email}, function(error, user){
                    if(error) return res.status(500).json({Error: 'Serve error'});

                    res.status(200).json({
                        'code': 200,
                        'status': 'success',
                        'admin': user
                    });
                });
            }
        });
    }catch (e){
        return res.status(500).json({ message: e.message })
    }
}

module.exports = searchFacultyController;