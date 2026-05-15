const express = require('express');
const router = express.Router();
const DetalleController = require('../controllers/detalle.controller');

// CRUD Endpoints
router.get('/', DetalleController.getAll);
router.post('/', DetalleController.createOrUpdate);
router.get('/:id', DetalleController.getById);
router.delete('/:id', DetalleController.deactivate);

module.exports = router;