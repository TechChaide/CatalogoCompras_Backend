const express = require('express');
const router = express.Router();
const ProveedorController = require('../controllers/proveedor.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.use(verifyToken);// CRUD Endpoints
router.get('/', ProveedorController.getAll);
router.post('/', ProveedorController.createOrUpdate);
router.get('/:id', ProveedorController.getById);
router.delete('/:id', ProveedorController.deactivate);

module.exports = router;