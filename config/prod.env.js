'use strict';
const secrets = require('./secrets');

module.exports = {
  NODE_ENV: '"production"',
  firebase: secrets.firebase,
};
