const express = require('express');
const authController = require('./auth.controller');
const authValidation = require('./auth.validation');
const validate = require('../../../middlewares/validate.middleware');

const authRoute = express.Router();

authRoute.post('/admin-login', validate(authValidation.login), authController.adminLogin);
authRoute.post('/logout', validate(authValidation.logout), authController.logout);
authRoute.post('/refresh-tokens', validate(authValidation.logout), authController.refreshTokens);

module.exports = authRoute;
