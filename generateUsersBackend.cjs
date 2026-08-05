const fs = require('fs');
const path = require('path');

const usersDir = path.join(__dirname, 'src', 'modules', 'users');
if (!fs.existsSync(usersDir)) fs.mkdirSync(usersDir, { recursive: true });

const ctrlContent = `
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

exports.getAll = async (req, res) => {
  try {
    const users = await prisma.user.findMany({ 
      select: { id: true, email: true, role: true, createdAt: true }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const password_hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password_hash, role: role || 'VIEWER' },
      select: { id: true, email: true, role: true }
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
`;

const routeContent = `
const express = require('express');
const router = express.Router();
const ctrl = require('./users.controller');
const { authenticateToken } = require('../../middlewares/auth.middleware');

router.get('/', authenticateToken, ctrl.getAll);
router.post('/', authenticateToken, ctrl.create);
router.delete('/:id', authenticateToken, ctrl.delete);

module.exports = router;
`;

fs.writeFileSync(path.join(usersDir, 'users.controller.js'), ctrlContent.trim());
fs.writeFileSync(path.join(usersDir, 'users.routes.js'), routeContent.trim());

// Update index.js
const indexPath = path.join(__dirname, 'src', 'index.js');
let indexContent = fs.readFileSync(indexPath, 'utf8');
if (!indexContent.includes('usersRoutes')) {
  indexContent = indexContent.replace(
    "const orgsRoutes = require('./modules/orgs/orgs.routes');",
    "const orgsRoutes = require('./modules/orgs/orgs.routes');\nconst usersRoutes = require('./modules/users/users.routes');"
  );
  indexContent = indexContent.replace(
    "app.use('/api/orgs', orgsRoutes);",
    "app.use('/api/orgs', orgsRoutes);\napp.use('/api/users', usersRoutes);"
  );
  fs.writeFileSync(indexPath, indexContent);
}

console.log('Generated Users backend module');
