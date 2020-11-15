/*
    Event Routes
    /api/events
*/

const { Router } = require("express");
const { getRoles, createRole, updateRole, deleteRole } = require("../controllers/roles");

const router = Router();

router.get('/', getRoles);
router.post('/', createRole);
router.put('/:id', updateRole);
router.delete('/:id', deleteRole);

module.exports = router;