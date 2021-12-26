const RegisterModel = require('../../models/senate/registerModel');
const RegisterFaculty = require('../../models/faculty/registerModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/app');

const login = async(req, res) => {

    const {username, password} = req.body;

    try{
        switch(username.substring(0, 3)){
            case 'SEN':{
                RegisterModel.model.findOne({username: username},
                function(error, user){
                    if(error) throw error;
                    if (!user) return res.status(404).json({ message: 'User not found!' });
                    if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: 'Incorrect password!'});
                    delete user.password; 
                    const token = jwt.sign(user.toJSON(), config.appKey, { expiresIn: 86400 });
                    return res.status(200).json({
                        'status':200, 
                        'message': 'success', 
                        'user': user,
                        'token': token
                    });
                });
                break;
            }
            case 'FAC':{
                RegisterFaculty.model.findOne({username: username},
                function(error, user){
                    if(error) throw error;
                    if (!user) return res.status(404).json({ message: 'User not found!' });
                    if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: 'Incorrect password!'});
                    delete user.password; 
                    const token = jwt.sign(user.toJSON(), config.appKey, { expiresIn: 86400 });
                    return res.status(200).json({
                        'status':200, 
                        'message': 'success', 
                        'user': user,
                        'token': token
                    });
                });
                break;
            }
            default:{
                return res.status(200).json({ message: 'User not found!' });
            }
        }
        
    }catch (e){
        return res.status(500).json({ message: e.message })
    }
}

module.exports = login;