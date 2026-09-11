const express = require('express');
const router = express.Router();
const AreaController = require('../controllers/Area.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.use(verifyToken);// CRUD Endpoints
router.get('/', AreaController.getAll);
router.post('/', AreaController.createOrUpdate);
router.get('/:id', AreaController.getById);
router.delete('/:id', AreaController.deactivate);

module.exports = router;