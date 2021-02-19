//Packages
const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    path = require("path"),
    flash = require("connect-flash");
//Env Variables
require('dotenv').config();


//Nodemailer
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: 'smtp.googlemail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//Requiring routes
var indexRoutes = require("./routes/index");

//ROUTER
app.use("/", indexRoutes);
app.post('/sendmail', (req, res) => {

    let to_email = req.body.email;
    let message = req.body.text;


    let messageOptions = {
        from: 'Portfolio Email Contact',
        to: to_email,
        subject: "asd",
        html: message
    };


    transporter.sendMail(messageOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.redirect('/');
    });
});


app.listen(process.env.PORT, function() {
    console.log("Portfolio server has started!")
});