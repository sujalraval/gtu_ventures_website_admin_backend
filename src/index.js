const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./modules/auth/auth.routes');
const mediaRoutes = require('./modules/media/media.routes');
const settingsRoutes = require('./modules/settings/settings.routes');
const auditRoutes = require('./modules/audit/audit.routes');
const startupsRoutes = require('./modules/startups/startups.routes');
const mentorsRoutes = require('./modules/mentors/mentors.routes');
const partnersRoutes = require('./modules/partners/partners.routes');
const mousRoutes = require('./modules/mous/mous.routes');
const schemesRoutes = require('./modules/schemes/schemes.routes');
const verticalsRoutes = require('./modules/verticals/verticals.routes');
const labsRoutes = require('./modules/labs/labs.routes');
const announcementsRoutes = require('./modules/announcements/announcements.routes');
const storiesRoutes = require('./modules/stories/stories.routes');
const testimonialsRoutes = require('./modules/testimonials/testimonials.routes');
const orgsRoutes = require('./modules/orgs/orgs.routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/startups', startupsRoutes);
app.use('/api/mentors', mentorsRoutes);
app.use('/api/partners', partnersRoutes);
app.use('/api/mous', mousRoutes);
app.use('/api/schemes', schemesRoutes);
app.use('/api/verticals', verticalsRoutes);
app.use('/api/labs', labsRoutes);
app.use('/api/announcements', announcementsRoutes);
app.use('/api/stories', storiesRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/orgs', orgsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
