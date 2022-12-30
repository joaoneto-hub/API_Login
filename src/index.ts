import dontenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { router } from './routes';

dontenv.config();


const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.set('strictQuery', true);

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.vg1p1.mongodb.net/?retryWrites=true&w=majority`).then(() => {

    const app = express();

    app.use(cors());

    const PORT = 3001;
    app.use(express.json());
    app.use(router);
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });

    console.log(' 🔥Connected to mongoDB');

}).catch((err) => {
    console.log(err);
});



