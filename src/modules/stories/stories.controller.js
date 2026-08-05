const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class StoriesController {
  async getAll(req, res) {
    try {
      const items = await prisma.story.findMany({ orderBy: { id: 'desc' } });
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const item = await prisma.story.findUnique({
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
      const item = await prisma.story.create({ data: req.body });
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const item = await prisma.story.update({
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
      await prisma.story.delete({
        where: { id: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new StoriesController();
