const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'src', 'index.js');
let indexContent = fs.readFileSync(indexPath, 'utf8');

const importsToAdd = `
const eventsRoutes = require('./modules/events/events.routes');
const teamRoutes = require('./modules/team/team.routes');
const resourcesRoutes = require('./modules/resources/resources.routes');
const leadsRoutes = require('./modules/leads/leads.routes');
`;

const routesToAdd = `
app.use('/api/events', eventsRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/resources', resourcesRoutes);
app.use('/api/leads', leadsRoutes);
`;

if (!indexContent.includes('./modules/events/events.routes')) {
  indexContent = indexContent.replace(
    "const orgsRoutes = require('./modules/orgs/orgs.routes');",
    "const orgsRoutes = require('./modules/orgs/orgs.routes');" + importsToAdd
  );
  
  indexContent = indexContent.replace(
    "app.use('/api/orgs', orgsRoutes);",
    "app.use('/api/orgs', orgsRoutes);" + routesToAdd
  );
  
  fs.writeFileSync(indexPath, indexContent);
  console.log('Registered backend modules in index.js');
}
