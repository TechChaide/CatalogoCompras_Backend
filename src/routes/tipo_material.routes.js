const express = require('express');
const router = express.Router();
const Tipo_materialController = require('../controllers/tipo_material.controller');

// CRUD Endpoints
router.get('/', Tipo_materialController.getAll);
router.post('/', Tipo_materialController.createOrUpdate);
router.get('/:id', Tipo_materialController.getById);
router.delete('/:id', Tipo_materialController.deactivate);

module.exports = router;