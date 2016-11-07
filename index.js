var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
app.set('port', (process.env.PORT || 8080));
var cors = require('cors'); 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())

app.post('/', function(request, response) {
    var origin = request.get('origin');
    console.log(request.body);
    console.log(origin);
    if(origin=="http://deepakpathania.github.io" || origin=="https://deepakpathania.github.io" || origin == "deepakpathania.github.io") {
    // create reusable transporter object using the default SMTP transport 
    var transporter = nodemailer.createTransport('smtps://deepak-t@letreach.com:trustthecomputer1@smtp.gmail.com');
     
    // setup e-mail data with unicode symbols 
    var mailOptions = {
        from: '"'+request.body.username+'" <'+request.body.email+'>',// sender address 
        to: 'deepakpathania789@gmail.com', // list of receivers 
        text: "From : " + " " + request.body.username + " " +request.body.msg + "His id : " + request.body.email, // plaintext body  
        subject: 'New response from contact form  by : ✔' + request.body.username // Subject line 
    };
     
    // send mail with defined transport object 
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

    response.json({'success': 1});
    }
    else {
        response.json({'success' : 0, 'reason': 'Invalid Origin'});
    }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


