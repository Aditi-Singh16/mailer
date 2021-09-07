const express = require('express');
const app = express();
require('dotenv').config();
const nodemailer = require("nodemailer");

app.get('/', (req, res) => {

    var email = req.query.email; //fetch email addr
    var template = req.query.template; //fetch html template

    if (email == undefined) {
        res.end(JSON.stringify({ error: 'Please provide an email' }))
    } else if (template == undefined) {
        res.end(JSON.stringify({ error: 'Please provide a template' }))
    }
    else {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        var mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Sending Email using Node.js',
            html: template
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.end(JSON.stringify({ error: error }))
            } else {
                console.log('Email sent: ' + info.response);
                res.end(JSON.stringify({ Message: info.response }))
            }
        });
    }
})



app.listen(process.env.PORT || 3000, function () {
    console.log('listening to port 3000 go to http://localhost:3000/')
});