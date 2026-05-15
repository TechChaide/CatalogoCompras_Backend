const express = require('express');
const router = express.Router();
const AreaController = require('../controllers/Area.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// CRUD Endpoints
router.get('/', verifyToken, AreaController.getAll);
router.post('/', verifyToken, AreaController.createOrUpdate);
router.get('/:id', verifyToken, AreaController.getById);
router.delete('/:id', verifyToken, AreaController.deactivate);

module.exports = router;