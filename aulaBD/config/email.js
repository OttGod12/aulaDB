const nodemailer = require('nodemailer')
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:process.env.EMAIL_ADRESS,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false,
    }
});

const mailOptions = {
    from: 'purimsavage@gmail.com',
    to: '',
    subject: '',
    text: '',
};

let enviarEmail = function(emailDestino, assunto, mensagem){
    mailOptions.to = emailDestino
    mailOptions.subject = assunto
    mailOptions.text = mensagem

    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error)
        }else{
            console.log('Email enviado! '+ info, response)

        }
    })
}
module.exports = enviarEmail