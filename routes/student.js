const Student = require("../models/student");
const express = require("express");
const utils = require("../utils/utils");

const router = express.Router();

router.post("/register", async function(req, res){
    console.log(req.body);
    try {
        const response = await Student.register(req.body);
        res.json(response);
    } catch(err){
        res.status(404).json({
            message: err.message,
        });
    }
});

router.post("/login", function(req, res){
    Student.find({

    })
});

module.exports = router;