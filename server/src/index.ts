// src/index.ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();


const app = express();
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


app.get("/vocablist", async (req, res) => {
    console.log('GET /vocablist');
    res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

