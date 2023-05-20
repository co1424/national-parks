const routes = require('express').Router();
const parksRoute = require('./parksRoutes');

routes.use('/', require('./swagger'));
routes.use('/', parksRoute);

module.exports = routes;