const express = require('express');
const router = express.Router();
const DetalleController = require('../controllers/detalle.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.use(verifyToken);// CRUD Endpoints
router.get('/', DetalleController.getAll);
router.post('/', DetalleController.createOrUpdate);
router.get('/:id', DetalleController.getById);
router.delete('/:id', DetalleController.deactivate);

router.post('/detallesByCodigoFamiliaMaterial', DetalleController.getByTipoFamiliaMaterial);

module.exports = router;