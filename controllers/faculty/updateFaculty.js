const RegisterFaculty = require('../../models/faculty/registerModel');
const jwt = require('jsonwebtoken');
const config = require('../../config/app');

const facultyUpdateController = async(req, res) => {

    try{
        const {faculty, dean, username, title, position, email} = req.body;
        const token = req.header('authorization').split(' ')[1];
        jwt.verify(token, config.appKey, function(error, done){
            if(error) if(error) return res.status(500).json({Error: 'Authentication failed'});
            if(done){
                RegisterFaculty.model.findOne({email: email}, function(error, users){
                    if(error) return res.status(500).json({Error: 'Serve error'});

                    users.faculty = faculty;
                    users.dean = dean;
                    users.username = username;
                    users.title = title;
                    users.position = position;

                    users.save(function(error){
                        if(!error){
                            res.status(200).json({
                                'code': 200,
                                'status': 'success',
                                'admin': users
                            })
                        }else{
                            res.status(500).json({
                                'code': 500,
                                'status': 'update failed',
                                'admin': users
                            })
                        }
                    })
                });
            }
        });
    }catch (e){
        return res.status(500).json({ message: e.message })
    }
}

module.exports = facultyUpdateController;