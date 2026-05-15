const express = require('express');
const router = express.Router();
const Familia_materialController = require('../controllers/familia_material.controller');

// CRUD Endpoints
router.get('/', Familia_materialController.getAll);
router.post('/', Familia_materialController.createOrUpdate);
router.get('/:id', Familia_materialController.getById);
router.delete('/:id', Familia_materialController.deactivate);

module.exports = router;