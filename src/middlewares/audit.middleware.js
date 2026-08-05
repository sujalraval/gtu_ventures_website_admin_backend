const prisma = require('../config/db');

/**
 * Express middleware to automatically log audit events for specific routes.
 * @param {string} entity - The entity being modified (e.g. 'Startup', 'Setting')
 */
const auditLog = (entity) => {
  return async (req, res, next) => {
    // We only care about successful write operations. 
    // We hook into res.json or res.send to capture the response.
    const originalJson = res.json;
    
    res.json = async function (data) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        let action = 'UNKNOWN';
        if (req.method === 'POST') action = 'CREATE';
        else if (req.method === 'PUT' || req.method === 'PATCH') action = 'UPDATE';
        else if (req.method === 'DELETE') action = 'DELETE';

        if (action !== 'UNKNOWN') {
          // If the URL ends with /publish, it's a publish action
          if (req.originalUrl.endsWith('/publish')) action = 'PUBLISH';

          // Try to safely extract the entity ID if possible
          let entityId = req.params.id || data.id?.toString() || null;
          
          try {
            await prisma.auditLog.create({
              data: {
                userId: req.user?.id || null,
                action,
                entity,
                entityId,
                before: req.auditBefore ? JSON.stringify(req.auditBefore) : null,
                after: action === 'DELETE' ? null : JSON.stringify(data),
              }
            });
          } catch (error) {
            console.error('Failed to write audit log:', error);
          }
        }
      }
      originalJson.call(this, data);
    };
    next();
  };
};

module.exports = { auditLog };
