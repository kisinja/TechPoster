const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log('MongoDB connected Successfully'))
    } catch (error) {
        console.log('Error: ', error.message);
        process.exit(1);
    }
};

module.exports = { connectDb };