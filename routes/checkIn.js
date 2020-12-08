/**
 Clients Routes
 /api/checkIn
*/

const { Router } = require('express');

const { createCheckIn } = require('../controllers/checkIn');

const router = Router();

router.post('/', createCheckIn);

module.exports = router;