"use strict";
var assert = require('assert');
var _ = require('lodash');
var Q = require('q');
var Mailer = function Mailer() {};
var sendGridLib = require('sendgrid');
/* eslint-disable no-unused-vars */
var sendgridInstance = {};
var sendgridFilters = {};
/* eslint-enable no-unused-vars */

var SendgridConnector = function SendgridConnector(settings) {
  assert(typeof settings === 'object', 'cannot init connector without settings');
  this.sendgrid = sendGridLib(settings.api_user, settings.api_key, settings.options);
  this.filters = settings.filters;
  sendgridFilters = this.filters;
  sendgridInstance = this.sendgrid;
};

SendgridConnector.initialize = function (dataSource, callback) {
  dataSource.connector = new SendgridConnector(dataSource.settings);
  callback();
};

SendgridConnector.prototype.DataAccessObject = Mailer;

/**
 * Send transactional email with options
 * Full list of options are available here: https://www.npmjs.com/package/sendgrid#available-params
 *
 * @param {Object} options
 * {
 *   from: { name: "John", email: "john@cellarise.com" },
 *   to: "mail@cellarise.com",
 *   subject: "Test mail",
 *   text: "Plain text message",
 *   html: "<b>Html messages</b> here"
 * }
 *
 * @param {Function} cb callback
 * @returns {Function} deferred promise
 */
Mailer.send = function (options, cb) {
  var dataSource = this.dataSource,
    //settings = dataSource && dataSource.settings,
    connector = dataSource.connector,
    deferred = Q.defer(),
    sendgridEmail,
    sendgridMessage = {};
  var fn = function (err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(result);
    }
    return cb && cb(err, result);
  };

  if (options.__data) {
    options = _.clone(options.__data);
  } else {
    options = _.clone(options);
  }

  assert(connector, 'Cannot send mail without a connector!');

  if (connector.sendgrid) {
    //email from param
    if (_.isString(options.from)) {
      sendgridMessage.from = options.from;
    } else if (_.isObject(options.from)) {
      sendgridMessage.fromname = options.from.name;
      sendgridMessage.from = options.from.email;
    } else {
      if (options.from_name) {
        sendgridMessage.fromname = options.from_name || '';
      }
      if (options.from_email) {
        sendgridMessage.from = options.from_email || '';
      }
    }
    delete options.from;

    //email to param
    if (_.isString(options.to)) {
      sendgridMessage.to = options.to.split(',');
    } else if (_.isObject(options.to)) {
      sendgridMessage.to = [options.to];
    } else {
      sendgridMessage.to = options.to;
    }
    delete options.to;

    sendgridMessage.text = options.text || '';
    sendgridMessage.html = options.html || '';
    sendgridEmail = new connector.sendgrid.Email(sendgridMessage);
    if (this.filters) {
      sendgridEmail.setFilters(this.filters);
    }

    connector.sendgrid.send(sendgridEmail, fn);
  } else {
    process.nextTick(function () {
      fn(null, options);
    });
  }
  return deferred.promise;
};

/**
 * Send an email instance using instance
 */

Mailer.prototype.send = function (fn) {
  return this.constructor.send(this, fn);
};

/**
 * Export the connector class
 */
module.exports = SendgridConnector;
