require('dotenv').config();
const express = require('express');
const app = express();

const morgan = require('morgan');

const { connectDb } = require('./db');

const port = process.env.PORT || 4500;

app.use(morgan('common'));

app.get('/api', (req, res) => {
    res.json({ message: 'Hello World' });
});

const startServer = async () => {
    try {
        await connectDb();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log('Error: ', error.message);
        process.exit(1);
    }
};

startServer();