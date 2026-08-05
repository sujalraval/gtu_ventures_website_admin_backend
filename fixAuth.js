const fs = require('fs');
const path = require('path');
const modules = ['mous', 'schemes', 'verticals', 'labs', 'announcements', 'stories', 'testimonials', 'orgs'];
const baseDir = path.join(process.cwd(), 'src', 'modules');
modules.forEach(mod => {
  const routesPath = path.join(baseDir, mod, `${mod}.routes.js`);
  let content = fs.readFileSync(routesPath, 'utf8');
  content = content.replace("require('../../middlewares/auth')", "require('../../middlewares/auth.middleware')");
  fs.writeFileSync(routesPath, content);
});
console.log('Fixed auth middleware imports');
