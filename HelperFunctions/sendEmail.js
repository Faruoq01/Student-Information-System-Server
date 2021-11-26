const nodemailer = require('nodemailer');

const sendEmail = function(email, message){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'farukumaraminu@gmail.com',
            pass: 'Ikara1993'
        }
    });

    const mailOptions = {
        from: 'farukumaraminu@gmail.com',
        to: email,
        subject: 'sending email using node.js',
        text: message
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else {
            console.log('Email sent: ' + info.response);
        }
    })
}

module.exports = sendEmail;