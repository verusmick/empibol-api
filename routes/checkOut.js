/**
 Clients Routes
 /api/checkOut
*/

const { Router } = require('express');

const { createCheckOut } = require('../controllers/checkOut');

const router = Router();

router.post('/', createCheckOut);

module.exports = router;