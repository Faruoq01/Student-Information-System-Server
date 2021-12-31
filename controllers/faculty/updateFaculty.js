const RegisterFacultyUsers = require('../../models/faculty/facultyUserModel');
const jwt = require('jsonwebtoken');
const config = require('../../config/app');

const facultyUpdateController = async(req, res) => {

    try{
        const {firstname, lastname, title, position, email} = req.body;
        const token = req.header('authorization').split(' ')[1];
        jwt.verify(token, config.appKey, function(error, done){
            if(error) return res.status(401).json({
                error:{ 
                    name:'TokenExpiredError', 
                    message:'Authentication failed'
                }
            });
            if(done){
                RegisterFacultyUsers.model.findOne({email: email}, function(error, users){
                    if(error) return res.status(500).json({Error: 'Serve error'});

                    users.firstname = firstname;
                    users.lastname = lastname;
                    users.title = title;
                    users.position = position;
                    users.email = email;

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