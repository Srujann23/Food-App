const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post("/createuser", async (req, res) => {
    try {
        await User.create({
            Name: req.body.Name,
            password: req.body.password,
            email: req.body.email,
            location: req.body.location,
        });
        res.json({ success: true });
    } catch (error) {
        // console.log(error);
        console.error("Error occurred",error);
        res.json({ success: false,error:error.message });
    }
});

module.exports = router;
