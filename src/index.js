const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./modules/auth/auth.routes');
const mediaRoutes = require('./modules/media/media.routes');
const settingsRoutes = require('./modules/settings/settings.routes');
const auditRoutes = require('./modules/audit/audit.routes');
const startupsRoutes = require('./modules/startups/startups.routes');

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
