const express = require('express');
const router = express.Router();
const MaterialController = require('../controllers/material.controller');

// CRUD Endpoints
router.get('/', MaterialController.getAll);
router.post('/', MaterialController.createOrUpdate);
router.get('/:id', MaterialController.getById);
router.delete('/:id', MaterialController.deactivate);

module.exports = router;