// src/index.ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import homeRouter from './routes/homeRoutes.js'; // have to import with js

dotenv.config();


const app = express();
app.use(express.json())
const router = express.Router();
const PORT = process.env.PORT || 8000;

console.log('Starting server', process.env.DB_URI_VOCABLOOM);

if (process.env.NODE_ENV == "development" && process.env.DB_URI_VOCABLOOM) {
    console.log('Development mode: Connecting to MongoDB');
    mongoose.connect(process.env.DB_URI_VOCABLOOM)
        .then(() => {
            console.log('Development mode: Mongo DB Connected!');
        })
        .catch((err) => {
            console.log(err);
        });
}

app.use(cors({
    origin: [
        "http://192.168.43.169:3000",
        "http://localhost:3000",
    ],
    credentials: true,
}));


app.use("/", homeRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

