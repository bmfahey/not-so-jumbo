var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://not.so.jumbo@gmail.com:comp20-s2016-team2@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Not So Jumbo" <no-relpy@not.so.jumbo.heroku.com>', // sender address
    to: 'PUT EMAIL HERE', // list of receivers
    subject: 'YOUR PROGRESS', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    // Uncomment to understand what is happening
    //console.log('Message sent: ' + info.response);
});