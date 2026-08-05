const express = require('express');
const router = express.Router();
const partnersController = require('./partners.controller');
const { authenticateToken } = require('../../middlewares/auth.middleware');
const { auditLog } = require('../../middlewares/audit.middleware');

router.get('/', partnersController.getAll);
router.get('/:id', partnersController.getOne);

router.post('/', authenticateToken, auditLog('Partner'), partnersController.create);
router.put('/:id', authenticateToken, auditLog('Partner'), partnersController.update);
router.delete('/:id', authenticateToken, auditLog('Partner'), partnersController.delete);

module.exports = router;
