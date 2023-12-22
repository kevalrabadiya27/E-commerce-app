const router = require('express').Router();
const User = require("../models/User")
const express = require('express')
router.use(express.json())
const cryptoJs = require("crypto-js");
const Jwt = require('jsonwebtoken')

// Register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: cryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    });
    try {
        await newUser.save();
        res.status(201).send({ sucess: true, newUser });
    } catch (err) {
        res.status(500).send({ sucess: false, err })
    }

});

// login
router.post("/login", async (req, res) => {
    let username = req.body.username
    try {
        const user = await User.findOne({ username });
        !user && res.status(401).json("Wrong crendentiast");

        const hashpassword = cryptoJs.AES.decrypt(user.password, process.env.PASS_SEC);
        const Originalpassword = hashpassword.toString(cryptoJs.enc.Utf8);

        Originalpassword !== req.body.password && res.status(401).json("Wrong crendentiast")

        const accesstoken = Jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SEC, { expiresIn: "3d" });

        const { password, ...others } = user._doc;

        res.status(200).send({ sucess: true, ...others, accesstoken })
    } catch (err) {
        res.status(500).json(err)
    }

})

module.exports = router;