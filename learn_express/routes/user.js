const express = require('express');

const router = express.Router();

//GET /uer Router
router.get('/', (req, res) => {
    res.send('Hello, User');
});

module.exports = router;