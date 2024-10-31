const codeIndex = require('../modules/v1/auth/codes/codes.index');
const tokenIndex = require('../modules/v1/auth/tokens/tokens.index');
const userIndex = require('../modules/v1/users/users.index');

const indexConstant = {
  codes: codeIndex,
  tokens: tokenIndex,
  users: userIndex,
};

module.exports = indexConstant;
