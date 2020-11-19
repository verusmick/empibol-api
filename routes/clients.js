/**
 Clients Routes
 /api/clients
*/

const { Router } = require('express');

const { getClients, createClient, updateClient, deleteClient, getClientById } = require('../controllers/clients');
const { jwtValidator } = require('../middlewares/jwt-validator');

const router = Router();
router.use(jwtValidator);

router.get('/', getClients);
router.get('/:id', getClientById);
router.post('/', [jwtValidator], createClient);
router.put('/:id', [jwtValidator], updateClient);
router.delete('/:id', [jwtValidator], deleteClient);

module.exports = router;