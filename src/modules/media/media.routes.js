const express = require('express');
const router = express.Router();
const mediaController = require('./media.controller');
const upload = require('../../middlewares/upload.middleware');
const { authenticateToken } = require('../../middlewares/auth.middleware');
const { auditLog } = require('../../middlewares/audit.middleware');

router.post('/', authenticateToken, upload.single('file'), auditLog('Media'), mediaController.upload);
router.get('/', authenticateToken, mediaController.getAll);
router.delete('/:id', authenticateToken, auditLog('Media'), mediaController.delete);

module.exports = router;
