const fs = require('fs');
const path = require('path');

const modules = [
  { name: 'events', model: 'event' },
  { name: 'team', model: 'teamMember' },
  { name: 'resources', model: 'resource' },
  { name: 'leads', model: 'lead' }
];

const basePath = path.join(__dirname, 'src', 'modules');

modules.forEach(mod => {
  const dirPath = path.join(basePath, mod.name);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
  
  // Controller
  const ctrlContent = `
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
  try {
    const data = await prisma.${mod.model}.findMany({ orderBy: { id: 'desc' } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await prisma.${mod.model}.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!data) return res.status(404).json({ error: 'Not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await prisma.${mod.model}.create({ data: req.body });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await prisma.${mod.model}.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await prisma.${mod.model}.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
`;
  fs.writeFileSync(path.join(dirPath, `${mod.name}.controller.js`), ctrlContent.trim());

  // Routes
  const routeContent = `
const express = require('express');
const router = express.Router();
const ctrl = require('./${mod.name}.controller');
const { authenticateToken } = require('../../middlewares/auth.middleware');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', authenticateToken, ctrl.create);
router.put('/:id', authenticateToken, ctrl.update);
router.delete('/:id', authenticateToken, ctrl.delete);

module.exports = router;
`;
  fs.writeFileSync(path.join(dirPath, `${mod.name}.routes.js`), routeContent.trim());
  console.log(`Generated backend module for ${mod.name}`);
});
