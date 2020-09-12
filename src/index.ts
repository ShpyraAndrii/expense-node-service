import { app } from './app';
import { connectDB } from './mongoDriver';

const { port, env } = require('./config');

connectDB();

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
