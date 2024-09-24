// Packages
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const nodemailer = require('nodemailer');
const path = require('path'); // Import path module
require('dotenv').config();

// Create an Express app
const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Nodemailer setup
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

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(flash());

// Requiring routes
const indexRoutes = require("./routes/index");

// Router
app.use("/", indexRoutes);

app.get("/resume", (req, res) => {
    res.render("resume");
});

app.post('/sendmail', (req, res) => {
    const { name, email, text: message } = req.body;

    const messageOptions = {
        from: email,
        name: name,
        to: process.env.EMAILUSER,
        subject: "Portfolio Email Contact",
        html: `Name: ${name}<br>Email: ${email}<br><p>${message}</p>`
    };

    transporter.sendMail(messageOptions, (error, info) => {
        let flashMessage = error ? "error" : "success";
        console.log(error ? error : 'Message %s sent: %s', info.messageId, info.response);
        res.render("index", { flash: flashMessage, name, email, message });
    });
});

// Export the Express app for Firebase Functions
exports.app = require('firebase-functions').https.onRequest(app);
