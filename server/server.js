const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const router = express.Router();
const cors = require("cors");
require('dotenv/config');

console.log("Database URL is ", process.env.DB_URI_VOCABLOOM);

app.use(cors({
  origin: [
    "http://192.168.43.169:3000",
    "http://localhost:3000",
  ],
  credentials: true,
})); 

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/vocablist', async(req, res) => {
  console.log('GET request for vocab list');
  res.send(JSON.stringify(MixedData));
})

const MixedData = [
  {
    type: "verb",
    word: "bondir",
    definition: "to jump",
    sentence: [
      ["En entendant le bruit soudain, le chat", 0],
      ["a bondi", 1],
      ["hors de sa cachette.", 0]
    ]
  },
  {
    type: "verb",
    word: "bondir",
    definition: "to jump",
    sentence: [
      ["À la fin du match, les supporters", 0],
      ["ont bondi", 1],
      ["de joie pour célébrer la victoire de leur équipe.", 0]
    ]

  },
  {
    type: "conjugate",
    word: "pleuvoir",
    definition: "to rain",
    tense: "present",
    conjugation: ["", "", "pleut", "", "", "pluvent"],
  },
  {
    type: "conjugate",
    word: "aimer",
    definition: "to like, to love",
    tense: "subjonctif",
    conjugation: ["aime", "aimes", "aime", "aimions", "aimiez", "aiment"],
  },
]
