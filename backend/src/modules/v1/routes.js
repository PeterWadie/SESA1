const express = require('express');
const authRoute = require('./auth/auth.route');
const contactRoute = require('./contacts/contacts.route');
const userRoute = require('./users/users.route');

const routes = express.Router();

routes.use('/auth', authRoute);
routes.use('/contacts', contactRoute);
routes.use('/users', userRoute);

module.exports = routes;
