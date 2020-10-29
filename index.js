const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const winston = require("winston");
const expressWinston = require("express-winston");

const killPort = require("kill-port");

const studentRoutes = require("./routes/student");
const schoolRoutes = require("./routes/school");
const classRoutes = require("./routes/school-class");

dotenv.config();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use("/api/students", studentRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/classes", classRoutes);

// app.use(expressWinston.logger({
//     transports: [
//       new winston.transports.Console()
//     ],
//     format: winston.format.combine(
//       winston.format.colorize(),
//       winston.format.json()
//     ),
//     meta: true, // optional: control whether you want to log the meta data about the request (default to true)
//     msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
//     expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
//     colorize: true // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
//     // ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response

// }));

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   defaultMeta: { service: 'user-service' },
//   transports: [
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     }),
//     //
//     // - Write all logs with level `error` and below to `error.log`
//     // - Write all logs with level `info` and below to `combined.log`
//     //
//     // new winston.transports.File({ filename: 'error.log', level: 'error' }),
//     // new winston.transports.File({ filename: 'combined.log' }),
//   ],
// });

killPort(process.env.PORT, 'tcp').then(function() {
  console.log("Previos server is down");
  app.listen(process.env.PORT, function() {
    // console.log(`PORT ${process.env.PORT} Server is running peacefully`);
    console.log(`PORT ${process.env.PORT} Server is running peacefully`);
  });
});


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(function(){
  console.log("MONGODB is also running");
}).catch(function(){
  console.log("MAybe your MOGO is not running");
  console.log("Failed to connect with database");
});