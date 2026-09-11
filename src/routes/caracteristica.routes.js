const express = require('express');
const router = express.Router();
const CaracteristicaController = require('../controllers/caracteristica.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.use(verifyToken);// CRUD Endpoints
router.get('/', CaracteristicaController.getAll);
router.post('/', CaracteristicaController.createOrUpdate);
router.get('/:id', CaracteristicaController.getById);
router.delete('/:id', CaracteristicaController.deactivate);

module.exports = router;