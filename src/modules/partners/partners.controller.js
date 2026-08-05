const prisma = require('../../config/db');

class PartnersController {
  async getAll(req, res) {
    try {
      const { type } = req.query;
      const filter = type ? { type } : {};
      
      const partners = await prisma.partner.findMany({
        where: filter,
        orderBy: { displayOrder: 'asc' }
      });
      res.json(partners);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const partner = await prisma.partner.findUnique({ where: { id: parseInt(id) } });
      if (!partner) return res.status(404).json({ error: 'Partner not found' });
      res.json(partner);
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

      const existing = await prisma.partner.findUnique({ where: { slug: data.slug } });
      if (existing) {
        data.slug = data.slug + '-' + Date.now();
      }

      const partner = await prisma.partner.create({ data });
      res.status(201).json(partner);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      req.auditBefore = await prisma.partner.findUnique({ where: { id: parseInt(id) } });
      
      const partner = await prisma.partner.update({
        where: { id: parseInt(id) },
        data: req.body
      });
      res.json(partner);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await prisma.partner.delete({ where: { id: parseInt(id) } });
      res.json({ message: 'Partner deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PartnersController();
