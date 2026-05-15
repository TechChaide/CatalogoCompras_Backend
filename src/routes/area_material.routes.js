const express = require('express');
const router = express.Router();
const Area_materialController = require('../controllers/area_material.controller');

// CRUD Endpoints
router.get('/', Area_materialController.getAll);
router.post('/', Area_materialController.createOrUpdate);
router.get('/:id', Area_materialController.getById);
router.delete('/:id', Area_materialController.deactivate);

module.exports = router;