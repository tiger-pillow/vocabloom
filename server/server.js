const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const router = express.Router();
const cors = require("cors");
require('dotenv/config');

// Connect to MongoDB
if (process.env.NODE_ENV === 'development') {
  console.log('Development mode: Connecting to MongoDB');
  mongoose.connect(process.env.DB_URI_VOCABLOOM, { useNewUrlParser: true, useUnifiedTopology: true })
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
app.use('/', require('./routes/homeRoutes.ts'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

