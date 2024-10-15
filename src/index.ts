// src/index.ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import homeRouter from './routes/homeRoutes.js'; // have to import with js
import path from "path";
import { fileURLToPath } from 'url';


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

if (process.env.NODE_ENV == "production" && process.env.DB_URI_VOCABLOOM) {
    console.log('Production mode: Connecting to MongoDB');
    mongoose.connect(process.env.DB_URI_VOCABLOOM)
        .then(() => {
            console.log('Production mode: Mongo DB Connected!');
        })
        .catch((err) => {
            console.log(err);
        });
}

app.use(cors({
    origin: [
        "http://192.168.43.169:3000",
        "http://localhost:3000",
        "https://vocabloom-7d180737e497.herokuapp.com/"
    ],
    credentials: true,
}));

// Equivalent of __filename
const __filename = fileURLToPath(import.meta.url);

// Equivalent of __dirname
const __dirname = path.dirname(__filename);


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve('client', 'build', 'index.html'));
    });
}

app.use("/", homeRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

