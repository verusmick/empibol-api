/**
 Clients Routes
 /api/reports
*/

const { Router } = require('express');
const { getInOutStatus } = require('../controllers/reports');

const router = Router();

router.get('/inOutStatus', getInOutStatus);
// router.get('/:id', getClientById);
// router.post('/', [jwtValidator], createClaient);
// router.put('/:id', [jwtValidator], updateClient);
// router.delete('/:id', [jwtValidator], deleteClient);

module.exports = router;