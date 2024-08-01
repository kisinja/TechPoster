require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const morgan = require('morgan');

const { connectDb } = require('./db');

const port = process.env.PORT || 4500;

app.use(express.json());
app.use(cors());
app.use(morgan('common'));

const authRouter = require('./routes/auth');
const jobRouter = require('./routes/job');

app.use('/api/auth', authRouter);
app.use('/api/jobs', jobRouter);

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