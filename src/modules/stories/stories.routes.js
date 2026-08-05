const express = require('express');
const router = express.Router();
const controller = require('./stories.controller');
const { protect } = require('../../middlewares/auth');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// Protected routes
router.post('/', protect, controller.create);
router.put('/:id', protect, controller.update);
router.delete('/:id', protect, controller.delete);

module.exports = router;
