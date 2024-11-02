const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Users = require('../models/Users');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_TOKEN = "shhhhh";

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
    '/createuser',
    [
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('address', 'Address must be atleast 6 characters').isLength({ min: 6 }),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, name, address } = req.body;

        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const newUser = new Users({
                name,
                email,
                address,
                password: hash
            });

            await newUser.save();

            const data = {
                user: newUser._id
            };

            const token = jwt.sign(data, JWT_TOKEN);

            res.status(201).json({ token });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }
);

// ROUTE 2: Login a User using: POST "/api/auth/login". No login required
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').exists().withMessage('Password is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }

            const data = {
                user: user._id
            };

            const token = jwt.sign(data, JWT_TOKEN);

            // Include user details in the response
            res.status(200).json({
                token,
                user: {
                    name: user.name,
                    email: user.email
                }

            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }
);

// ROUTE 3: Get user details using: GET "/api/auth/getuserdetails". Login required
router.get('/getuserdetails', fetchuser, async (req, res) => {
    try {
        const userId = req.user;
        const user = await Users.findById(userId).select("-password")
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


router.get('/search/:findkey', async (req, res) => {
    try {
        // const searchKey = req.params.findkey;

        // Use regex to perform case-insensitive search
        let data = await Users.find({
            $or: [
                {
                    name: {
                        $regex: req.params.findkey,
                        $options: 'i'  // Case-insensitive search
                    }
                }
            ]
        });

        // Return the found data
        res.send(data);
        console.log(data);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;
