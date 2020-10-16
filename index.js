const config = require("./config/config.json");
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');

const winston = require("winston");
const expressWinston = require("express-winston");

const School = require("./models/school.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    
    // ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));


app.post("/", (req, res) => {
    const school = School(req.body);
    console.log(req.body);
    school.save()
    .then((savedSchool) => {
        res.json(savedSchool);
    }).catch((err) => {
        res.status(406).json({
            status: "error",
            message: err.message
        });
    });
});


app.get("/", (req, res) => {
    console.log("Hell called me");
    School.find()
    .then((allSchools) => {
        res.json(allSchools);
    });
});


app.listen(9069, () => console.log('Server is running peacefully'));

console.log(config.mongoURL);

mongoose.connect(config.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});