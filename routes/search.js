const express = require('express');
const {search} = require('../controllers/search');

router = express.Router();

router.post("/", search);

module.exports = router;
