import mongoose from 'mongoose';

const { db } = require('./config');

export function connectDB() {
    mongoose
        .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Successfully connected to db'))
        .catch((e) => console.error('Failed to connect to db'));
}

export default mongoose.connection;
