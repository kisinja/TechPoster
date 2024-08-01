const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
const register = async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            role
        });

        await user.save();

        if (!user) {
            return res.status(400).json({ message: 'User not created' });
        }


        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err.message);
    }
};

// Login User
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, userExists.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            {
                id: userExists._id,
                role: userExists.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1D' }
        );

        res.status(200).json({ message: 'User logged in successfully', token });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err.message);
    }
};

module.exports = {
    register,
    login
};