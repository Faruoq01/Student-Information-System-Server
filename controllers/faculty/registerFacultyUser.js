const RegisterFacultyUser = require('../../models/faculty/facultyUserModel');
const mailAgent = require('../../HelperFunctions/sendEmail');
const genPassword = require('generate-password');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/app');

const registerFacultyController = async(req, res) => {

    const password = genPassword.generate({
        length: 10,
    });

    message = 'hello welcome to SIDS, your username is '+req.body.email+' and password is: '+password+'';

    const hashedPassword = await bcrypt.hash(password, 10);

    let saveData = new RegisterFacultyUser.model({
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
        'username': req.body.username,
        'password': hashedPassword,
        'title': req.body.title,
        'userType': "faculty",
        'position': req.body.position,
        'activeStatus': '0',
        'image': null,
        'email': req.body.email
    }); 

    let {email, username, faculty} = req.body;

    const token = req.header('authorization').split(' ')[1];
    jwt.verify(token, config.appKey, function(error, done){
        if(error) return res.status(401).json({
            error:{ 
                name:'TokenExpiredError', 
                message:'Authentication failed'
            }
        });
        if(done){
            RegisterFacultyUser.model.findOne({$or:[
                {email:email},
                {faculty: faculty},
                {username: username}
            ]}, 
            function(error, user){
                if(error) throw error;
                if(user!==null){
                    res.status(200).json({
                        'code': 200,
                        'status': 'success', 
                        'message': 'user already exist'
                    });
                }else{
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
                    });
                }
            })
        }
    })   
}

module.exports = registerFacultyController;