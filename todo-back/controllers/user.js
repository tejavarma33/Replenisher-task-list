const express = require('express');
const User = require("../models/user");

const router = express.Router();
// add task
const login = router.post("/login", (req, res) => {
    console.log(req.body.email);
    User.findOneOrCreate({email: req.body.email}, (err, result) => {
        console.log("result ", err, result);
        let response = {};
        response.meta = {};
        if (err) {
            response.meta.status = "fail";
            response.meta.message = "database validation error";
            return res.status(422).json(response)
        }
        response.data = {};
        response.meta.status = "success";
        response.meta.message = "User fetched successfully";
        response.data.user = result;
        return res.status(200).json(response);
    });
});
module.exports = {login};
