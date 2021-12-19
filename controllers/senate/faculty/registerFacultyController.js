const RegisterFaculty = require('../../../models/faculty/registerModel');
const mailAgent = require('../../../HelperFunctions/sendEmail');
const genPassword = require('generate-password');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../../config/app');

const registerFacultyController = async(req, res) => {

    const password = genPassword.generate({
        length: 10,
    });

    message = 'hello welcome to SIDS, your username is '+req.body.email+' and password is: '+password+'';

    const hashedPassword = await bcrypt.hash(password, 10);

    let saveData = new RegisterFaculty.model({
        'faculty': req.body.faculty,
        'dean': req.body.dean,
        'username': req.body.username,
        'password': hashedPassword,
        'title': req.body.title,
        'userType': "faculty",
        'position': req.body.position,
        'activeStatus': '0',
        'image': null,
        'email': req.body.email
    }); 

    const token = req.header('authorization').split(' ')[1];
    jwt.verify(token, config.appKey, function(error, done){
        if(error) return res.status(401).json({
            error:{ 
                name:'TokenExpiredError', 
                message:'Authentication failed'
            }
        });
        if(done){
            RegisterFaculty.model.findOne({email: req.body.email}, 
            function(error, user){
                if(error) throw error;
    
                if(user){
                    res.status(200).json({
                        'code': 200,
                        'status': 'success', 
                        'message': 'user already exist'
                    })
                }else {
                    saveData.save(function(error, result){
                        if(error) throw error;
                
                        if(result){
                            res.status(200).json({
                                'status':200, 
                                'message': 'success', 
                                'data': result
                            });
                            mailAgent(req.body.email, message);
                        }
                    })
                }
                    
            })
        }
    })   
}

module.exports = registerFacultyController;