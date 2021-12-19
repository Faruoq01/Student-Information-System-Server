const RegisterModel = require('../../../models/senate/registerModel');
const mailAgent = require('../../../HelperFunctions/sendEmail');
const genPassword = require('generate-password');
const bcrypt = require('bcrypt');
const db = require('../../../config/mongoose');

const register = async(req, res) => {

    const password = genPassword.generate({
        length: 10,
    });

    message = 'hello welcome to SIDS, your username is '+req.body.email+' and password is: '+password+'';

    const hashedPassword = await bcrypt.hash(password, 10);

        let saveData = new RegisterModel.model({
            'firstname': req.body.firstname,
            'lastname': req.body.lastname,
            'username': req.body.username,
            'password': hashedPassword,
            'title': req.body.title,
            'userType': "senate",
            'position': req.body.position,
            'image': null,
            'email': req.body.email
        }); 

        RegisterModel.model.findOne({email: req.body.email}, 
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

module.exports = register;