const express = require('express');
const router = express.Router();
const startupsController = require('./startups.controller');
const { authenticateToken } = require('../../middlewares/auth.middleware');
const { auditLog } = require('../../middlewares/audit.middleware');

router.get('/', startupsController.getAll);
router.get('/:id', startupsController.getOne);

router.post('/', authenticateToken, auditLog('Startup'), startupsController.create);
router.put('/:id', authenticateToken, auditLog('Startup'), startupsController.update);
router.delete('/:id', authenticateToken, auditLog('Startup'), startupsController.delete);

module.exports = router;
