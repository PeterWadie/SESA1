const httpStatus = require('http-status');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const ApiError = require('../../../utils/ApiError');
const catchAsync = require('../../../utils/catchAsync');
const userService = require('../users/users.service');
const codeService = require('./codes/codes.service');
const tokenService = require('./tokens/tokens.service');
const roleConstant = require('../../../constants/roles.constant');
const errorCode = require('../../../codes/error.code');

const adminLogin = catchAsync(async (req, res) => {
  const user = await userService.getById(req.body.email);
  if (user.role === roleConstant.USER) throw new ApiError(httpStatus.BAD_REQUEST, errorCode.ADMIN_ROLE_LOGIN);
  const correctPassword = await bcrypt.compare(req.body.password, user.password);
  if (!correctPassword) throw new ApiError(httpStatus.BAD_REQUEST, errorCode.INCORRECT_PASSWORD);
  const tokens = await tokenService.createBothTokens({ email: user.email, role: user.role });
  res.send({ user: _.omit(user, ['password']), tokens });
});

const logout = catchAsync(async (req, res) => {
  await tokenService.deleteById(req.body.token);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await tokenService.refreshTokens(req.body.token);
  res.send(tokens);
});

const resetPassword = catchAsync(async (req, res) => {
  const codeDoc = await codeService.verifyCode(req.body.code);
  const user = await userService.getById(codeDoc.email);
  const newUser = await userService.updateById(codeDoc.email, { password: req.body.password, verified: true });
  const tokens = await tokenService.createBothTokens({ email: user.email, role: user.role });
  res.send({ user: _.omit(newUser, ['password']), tokens });
});

const verifyCode = catchAsync(async (req, res) => {
  await codeService.getById(req.body.code);
  res.status(httpStatus.NO_CONTENT).send();
});

const confirmEmail = catchAsync(async (req, res) => {
  const codeDoc = await codeService.verifyCode(req.body.code);
  const user = await userService.getById(codeDoc.email);
  const newUser = await userService.updateById(codeDoc.email, { verified: true });
  const tokens = await tokenService.createBothTokens({ email: user.email, role: user.role });
  res.send({ user: _.omit(newUser, ['password']), tokens });
});

const authController = {
  adminLogin,
  logout,
  refreshTokens,
  verifyCode,
  resetPassword,
  confirmEmail,
};

module.exports = authController;
