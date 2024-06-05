const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');



router.post("/createuser", [
    body('email').isEmail(),
    body('name', 'Wrong Name Format').isLength({ min: 2 }),
    body('password', 'Wrong Password Format').isLength({ min: 5 })]
    , async (req, res) => {
        console.log(req.body.name, req.body.password, req.body.email, req.body.location)

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                location: req.body.location,
            });
            res.json({ success: true });
        } catch (error) {
            // console.log(error);
            console.error("Error occurred", error);
            res.json({ success: false, error: error.message });
        }
    });


router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Wrong Password Format').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email })
            if (!userData) {
                return res.status(400).json({ error: "Invalid Credentials!" });
            }

            if (req.body.password !== userData.password) {
                return res.status(400).json({ error: "Invalid Credentials!" });
            }
            return res.json({ success: true });
        } catch (error) {
            console.log(error);
            // console.error("Error occurred", error);
            res.json({ success: false, error: error.message });
        }
    });

module.exports = router;
