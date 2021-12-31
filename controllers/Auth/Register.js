const RegisterModel = require('../../models/senate/registerModel');
const RegisterFaculty = require('../../models/faculty/registerModel');
const mailAgent = require('../../HelperFunctions/sendEmail');
const genPassword = require('generate-password');
const bcrypt = require('bcrypt');

const register = async(req, res) => {

    const password = genPassword.generate({
        length: 10,
    });

    message = 'hello welcome to SIDS, your username is '+req.body.email+' and password is: '+password+'';

    const hashedPassword = await bcrypt.hash(password, 10);

    try{
        switch(req.body.username.substring(0, 3)){
            case 'SEN':{
                let saveData = new RegisterModel.model({
                    'firstname': req.body.firstname,
                    'lastname': req.body.lastname,
                    'username': req.body.username,
                    'password': hashedPassword,
                    'title': req.body.title,
                    'userType': "senate",
                    'position': req.body.position,
                    'image': null,
                    'email': req.body.email,
                    'activeStatus': req.body.activeStatus
                }); 
        
                RegisterModel.model.findOne({$or:[
                    {username:req.body.username},
                    {email:req.body.email}
                ]}, 
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
                                    mailAgent(req.body.email, message);
                                    return res.status(200).json({
                                        'status':200, 
                                        'message': 'success', 
                                        'data': result
                                    });
                                }
                            })
                        }
                })
                break;
            }
    
            case 'FAC':{
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
        
                RegisterFaculty.model.findOne({$or:[
                    {username:req.body.username},
                    {email:req.body.email}
                ]}, 
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
                                    mailAgent(req.body.email, message);
                                    return res.status(200).json({
                                        'status':200, 
                                        'message': 'success', 
                                        'data': result
                                    });
                                }
                            })
                        }
                })
                break;
            }
            default:{
                return res.status(200).json({
                    'code': 200,
                    'status': 'success', 
                    'message': 'Invalid Username'
                })
            }
        }
    }catch(ex){
        return res.status(500).json({ message: ex.message })
    }

}

module.exports = register;