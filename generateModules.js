const fs = require('fs');
const path = require('path');

const modules = ['mous', 'schemes', 'verticals', 'labs', 'announcements', 'stories', 'testimonials', 'orgs'];
const modelMap = {
  mous: 'mou', schemes: 'scheme', verticals: 'vertical', labs: 'lab',
  announcements: 'announcement', stories: 'story', testimonials: 'testimonial', orgs: 'org'
};

const baseDir = path.join(process.cwd(), 'src', 'modules');

modules.forEach(mod => {
  const dir = path.join(baseDir, mod);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const model = modelMap[mod];
  const ControllerClass = mod.charAt(0).toUpperCase() + mod.slice(1) + 'Controller';

  const controllerContent = `const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ${ControllerClass} {
  async getAll(req, res) {
    try {
      const items = await prisma.${model}.findMany({ orderBy: { id: 'desc' } });
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const item = await prisma.${model}.findUnique({
        where: { id: parseInt(req.params.id) }
      });
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const item = await prisma.${model}.create({ data: req.body });
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const item = await prisma.${model}.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
      });
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await prisma.${model}.delete({
        where: { id: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ${ControllerClass}();
`;

  const routesContent = `const express = require('express');
const router = express.Router();
const controller = require('./${mod}.controller');
const { protect } = require('../../middlewares/auth');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// Protected routes
router.post('/', protect, controller.create);
router.put('/:id', protect, controller.update);
router.delete('/:id', protect, controller.delete);

module.exports = router;
`;

  fs.writeFileSync(path.join(dir, `${mod}.controller.js`), controllerContent);
  fs.writeFileSync(path.join(dir, `${mod}.routes.js`), routesContent);
});

console.log('Successfully generated controllers and routes');
