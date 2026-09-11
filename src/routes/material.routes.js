const express = require('express');
const router = express.Router();
const MaterialController = require('../controllers/material.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.use(verifyToken);// CRUD Endpoints
router.get('/', MaterialController.getAll);
router.post('/', MaterialController.createOrUpdate);
router.get('/:id', MaterialController.getById);
router.delete('/:id', MaterialController.deactivate);

module.exports = router;