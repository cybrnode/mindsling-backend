const express      = require('express');
const cors         = require('cors');
const bodyParser   = require('body-parser');
const cookieParser = require("cookie-parser");
const fileUpload   = require("express-fileupload");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs     = require('fs');
const ip     = require('ip');

const winston = require("winston");
const expressWinston = require("express-winston");

const killPort = require("kill-port");

const studentRoutes = require("./routes/users/student");
const schoolRoutes  = require("./routes/school/school");
const classRoutes   = require("./routes/school/class/school-class");


dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(fileUpload());


app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
  meta: false, // optional: control whether you want to log the meta data about the request (default to true)
  msg: function(req, res) {
    return `${req.method} ${req.url}`;
  },
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: true // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  
  // ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));


app.use("/api/students", studentRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/classes", classRoutes);


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

app.post("/files", function (req, res) {
 
  /*
  * If file-storage folder doesn't exists:
  *   create one
  */

  const dir = './files/';
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  // TODO: Remove this redundant log
  console.log(req.files);


  if (req.files.file) {
    
    let file = req.files.file;

    const oldFileName = file.name;
    const splitedFileName = oldFileName.split('.');
    const ext = splitedFileName[splitedFileName.length - 1];
    const randomFileName = Math.random().toString().substring(3);

    const newFileName = dir + randomFileName + '.' + ext;
    
    file.mv(newFileName).then(function() {
      res.json({
        url: `http://${ip.address()}:${process.env.PORT}/${newFileName}`
      });
    }).catch((err) => utils.dataErrorHandeler(req, res, err));

  } else {
    res.status(406).json({
      message: "Required file doesn't exists."
    });
  }
});


app.listen(process.env.PORT, function() {
  console.log(`Server: http://${ip.address()}:${process.env.PORT}`);
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