const express = require('express');
const router = express.Router();
const settingsController = require('./settings.controller');
const { authenticateToken } = require('../../middlewares/auth.middleware');
const { auditLog } = require('../../middlewares/audit.middleware');

// We restrict Settings to Super Admin only, we can do a simple check inline for now
const checkSuperAdmin = (req, res, next) => {
  if (req.user?.role !== 'SUPER_ADMIN') {
    return res.status(403).json({ error: 'Super Admin only' });
  }
  next();
};

router.get('/', authenticateToken, checkSuperAdmin, settingsController.getAll);
router.put('/:key', authenticateToken, checkSuperAdmin, auditLog('Setting'), settingsController.update);

module.exports = router;
