const prisma = require('../../config/db');

class MentorsController {
  async getAll(req, res) {
    try {
      const mentors = await prisma.mentor.findMany({
        orderBy: { displayOrder: 'asc' }
      });
      res.json(mentors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const mentor = await prisma.mentor.findUnique({ where: { id: parseInt(id) } });
      if (!mentor) return res.status(404).json({ error: 'Mentor not found' });
      res.json(mentor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const data = { ...req.body };
      if (!data.slug) {
        data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      }

      const existing = await prisma.mentor.findUnique({ where: { slug: data.slug } });
      if (existing) {
        data.slug = data.slug + '-' + Date.now();
      }

      const mentor = await prisma.mentor.create({ data });
      res.status(201).json(mentor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      req.auditBefore = await prisma.mentor.findUnique({ where: { id: parseInt(id) } });
      
      const mentor = await prisma.mentor.update({
        where: { id: parseInt(id) },
        data: req.body
      });
      res.json(mentor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await prisma.mentor.delete({ where: { id: parseInt(id) } });
      res.json({ message: 'Mentor deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new MentorsController();
