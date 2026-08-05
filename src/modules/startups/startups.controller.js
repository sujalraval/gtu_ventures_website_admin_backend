const prisma = require('../../config/db');

class StartupsController {
  async getAll(req, res) {
    try {
      const startups = await prisma.startup.findMany({
        orderBy: { createdAt: 'desc' }
      });
      res.json(startups);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const startup = await prisma.startup.findUnique({ where: { id: parseInt(id) } });
      if (!startup) return res.status(404).json({ error: 'Startup not found' });
      res.json(startup);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      // Slugs should be unique, usually generated on the frontend or backend
      const data = { ...req.body };
      if (!data.slug) {
        data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      }

      // Check for unique slug
      const existing = await prisma.startup.findUnique({ where: { slug: data.slug } });
      if (existing) {
        data.slug = data.slug + '-' + Date.now();
      }

      const startup = await prisma.startup.create({ data });
      res.status(201).json(startup);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      req.auditBefore = await prisma.startup.findUnique({ where: { id: parseInt(id) } });
      
      const startup = await prisma.startup.update({
        where: { id: parseInt(id) },
        data: req.body
      });
      res.json(startup);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await prisma.startup.delete({ where: { id: parseInt(id) } });
      res.json({ message: 'Startup deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new StartupsController();
