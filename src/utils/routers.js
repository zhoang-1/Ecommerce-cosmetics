const auth = require('../routers/auth'); 
function registerRoutes(app) {
  app.use('/api/auth', auth);
}

module.exports = registerRoutes;