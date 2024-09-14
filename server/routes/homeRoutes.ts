const {getAllCards} = require('../controllers/cardController.ts') ;
const express = require('express');
const router = express.Router();


router.get('/vocablist', async (req, res) => {
    console.log("vocablist route hit")
    const MixedData = await getAllCards({cardType: "verb"});
    res.send(JSON.stringify(MixedData));
})

module.exports = router;