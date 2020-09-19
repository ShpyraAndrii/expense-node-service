import dotenv from 'dotenv';

dotenv.config();

module.exports = {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    db: process.env.DB,
    currApiKey: process.env.CURR_API_KEY,
};
