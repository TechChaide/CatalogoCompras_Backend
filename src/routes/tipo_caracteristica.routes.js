const express = require('express');
const router = express.Router();
const Tipo_caracteristicaController = require('../controllers/tipo_caracteristica.controller');

// CRUD Endpoints
router.get('/', Tipo_caracteristicaController.getAll);
router.post('/', Tipo_caracteristicaController.createOrUpdate);
router.get('/:id', Tipo_caracteristicaController.getById);
router.delete('/:id', Tipo_caracteristicaController.deactivate);

module.exports = router;