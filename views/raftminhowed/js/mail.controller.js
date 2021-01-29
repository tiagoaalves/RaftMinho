const jsonMessagesPath = __dirname + "../../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "mail");

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');


window.onload = function() {
    //sendMail();
};


function sendMail(req, res) {
 console.log('ola');
 Swal.fire('Mensagem enviada com sucesso!');
 const name = req.sanitize('name').escape();
 const email = req.sanitize('email').escape();
 const message = req.sanitize('message').escape();
 req.checkBody("name", "Insira apenas texto", 'pt-PT').matches(/^[a-z ]+$/i);
 req.checkBody("email", "Insira um email válido.").isEmail();
 const errors = req.validationErrors();
 if (errors) {
  res.send(errors);
  return;
 }
 else {
  if (typeof(email) != "undefined" && typeof(message) != "undefined" && typeof(name) != "undefined") {
   let bodycontent = "";
   bodycontent += 'Caro ' + req.body.name + ',<br>' + '<br>';
   bodycontent += 'Agradecemos o seu contacto!' + '<br>' + 'Obrigado!' + '<br>' + '<br>';
   bodycontent += 'Mensagem enviada: <blockquote><i>';
   bodycontent += req.body.subject + '<br>' + '<br>' + 'mensagem enviada por ' + req.body.name;
   bodycontent += ' com o email <a href="mailto:' + req.body.email + '" target="_top">' + req.body.email + '</a>';
   bodycontent += '</i></blockquote>';
   bodycontent += '<img src="https://fcawebbook.herokuapp.com/assets/images/mail.png" alt="mail.icon" height="42" width="42">';
   const transporter = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    auth: {
     user: 'raftminho',
     pass: 'olkjhgfds'
    }
   }));
   transporter.verify(function(error, success) {
    if (error) {
     console.log(error);
     res.status(jsonMessages.mail.serverError.status).send(jsonMessages.mail.serverError);
    }
    else {
     console.log('Server is ready to take our messages');
    }
   });
   const mailOptions = {
    from: req.body.email,
    to: 'raftminho1920@gmail.com',
    cc: req.body.email,
    //titulo do email
    subject: 'Raftminho - site contact',
    html: bodycontent
   };
   transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
     console.log(error);
     res.status(jsonMessages.mail.mailError.status).send(jsonMessages.mail.mailError);
    }
    else {
     console.log('Email sent: ' + info.response);
     res.status(jsonMessages.mail.mailSent.status).send(jsonMessages.mail.mailSent);
    }
   });
  }
  else
   res.status(jsonMessages.mail.requiredData.status).send(jsonMessages.mail.requiredData);
 }

}
//exportar as funções
module.exports = { 
 send: sendMail
};
