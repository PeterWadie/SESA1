const express = require('express');
const auth = require('../../../middlewares/auth.middleware');
const validate = require('../../../middlewares/validate.middleware');
const contactValidation = require('./contacts.validation');
const contactController = require('./contacts.controller');
const roleConstant = require('../../../constants/roles.constant');

const contactRoute = express.Router();

contactRoute
  .route('/')
  .post(validate(contactValidation.create), contactController.create)
  .get(auth(roleConstant.ADMIN), validate(contactValidation.get), contactController.query);

contactRoute
  .route('/:id')
  .get(auth(roleConstant.ADMIN), validate(contactValidation.remove), contactController.get)
  .patch(auth(roleConstant.ADMIN), validate(contactValidation.update), contactController.update)
  .delete(auth(roleConstant.ADMIN), validate(contactValidation.remove), contactController.remove);

module.exports = contactRoute;
