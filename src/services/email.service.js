var nodeMailer= require('nodemailer');

var Config= require('../config');

exports.sendEmail=(mailOptions) => {
var transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: Config.AppConfig.EMAIL_ID,
      pass: Config.AppConfig.PASSWORD
    }
  });
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

