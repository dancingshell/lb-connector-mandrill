/**
 * Dependencies
 */

var Mandrill = require('mandrill-api/mandrill'),
  assert = require('assert'),
  loopback = require('../../loopback'),
  _ = require('lodash'),
  Q = require('q');

/**
 * Export the connector class
 */

module.exports = MandrillConnector;

/**
 * Configure and create an instance of the connector
 */

function MandrillConnector(settings) {

  assert(typeof settings === 'object', 'cannot init connector without settings');

  if (loopback.isServer) {
    this.mandrill = new Mandrill.Mandrill(settings.apikey);
  }
}

MandrillConnector.initialize = function (dataSource, callback) {

  dataSource.connector = new MandrillConnector(dataSource.settings);
  callback();
};

MandrillConnector.prototype.DataAccessObject = Mailer;

function Mailer() {

}


/**
 * Send transactional email with options
 *
 * Basic options:
 *
 * {
 *   from: { name: "evenemento", email: "crew@evenemento.co" },
 *   to: "hello@evenemento.co",
 *   subject: "Ho ho",
 *   text: "Plain text message",
 *   html: "<b>Html messages</b> put here"
 * }
 *
 * Full list of options are available here:
 * https://mandrillapp.com/api/docs/messages.nodejs.html#method=send
 *
 * if option `template' is set than message will be send as template:
 *
 * {
 *   from: { name: "evenemento", email: "crew@evenemento.co" },
 *   to: "hello@evenemento.co",
 *   subject: "Ho ho",
 *   template: {
 *      name: "signup-confirm",
 *      content: {
 *        name: "NewUser Name",
 *        accountId: "123456"
 *      }
 *   }
 * }
 *
 * https://mandrillapp.com/api/docs/messages.nodejs.html#method=send-template
 *
 *
 * @param {Object} options
 * @param {Function} callback
 */

Mailer.send = function (options, cb) {
  var dataSource = this.dataSource,
    settings = dataSource && dataSource.settings,
    connector = dataSource.connector,
    deferred = Q.defer(),
    mandrilMessage = {
      message: {}
    };

  if (options.__data) {
    options = _.clone(options.__data);
  }
  else {
    options = _.clone(options);
  }

  var fn = function (err, result) {
    if (err) {
      deferred.reject(err);
    }
    else {
      deferred.resolve(result);
    }
    cb && cb(err, result);
  };

  assert(connector, 'Cannot send mail without a connector!');

  if (connector.mandrill) {

    if (_.isString(options.from)) {
      mandrilMessage.message.from_email = options.from
    }
    else if (_.isObject(options.from)) {
      mandrilMessage.message.from_name = options.from.name;
      mandrilMessage.message.from_email = options.from.email;
    }
    else {
      if (options.from_name) {
        mandrilMessage.message.from_name = options.from_name || undefined;
      }
      if (options.from_email) {
        mandrilMessage.message.from_email = options.from_email || undefined;
      }
    }
    delete options.from;


    if (_.isString(options.to)) {
      mandrilMessage.message.to = options.to.split(',');

      mandrilMessage.message.to.forEach(function (email, index) {
        mandrilMessage.message.to[index] = {email: email};
      });

    }
    else if (_.isObject(options.to)) {
      mandrilMessage.message.to = [options.to];
    }
    else {
      mandrilMessage.message.to = options.to;
    }
    delete options.to;

    if (options.template) {
      assert(options.template.name, 'template name should be defined');

      mandrilMessage.template_name = options.template.name;
      mandrilMessage.template_content = options.template.content || [];
      delete options.template;

      _.extend(mandrilMessage.message, _.extend(options, settings.defaults))
      _.extend(mandrilMessage, {
        async: settings.async || false
      });

      connector.mandrill.messages.sendTemplate(mandrilMessage, function (result) {
        fn(null, result);
      }, function (err) {
        fn(err, null);
      });
    }
    else {
      _.extend(mandrilMessage.message, _.extend(options, settings.defaults))
      _.extend(mandrilMessage, {
        async: settings.async || false
      });

      connector.mandrill.messages.send(mandrilMessage, function (result) {
        fn(null, result);
      }, function (err) {
        fn(err, null);
      });
    }
  } else {
    console.warn('Warning: no connectiom with Mandrill');
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


Mailer.subaccounts = function () {

  var connector = this.dataSource.connector;

  return {
    list: function (query, cb) {

      var deferred = Q.defer();

      if (_.isFunction(query) && !cb) {
        cb = query;
      }

      connector.mandrill.subaccounts.list({q: query}, function (result) {
        deferred.resolve(result);
        cb && cb(null, result);
      }, function (error) {
        deferred.resolve(error);
        cb && cb(error);
      });

      return deferred.promise;
    },

    add: function (subaccount, cb) {
      var dataSource = this.dataSource,
        connector = dataSource.connector,
        deferred = Q.defer();


      connector.mandrill.subaccounts.add(subaccount, function (result) {
        deferred.resolve(result);
        cb && cb(null, result);
      }, function (error) {
        deferred.resolve(error);
        cb && cb(error);
      });

      return deferred.promise;
    },
    info: function (id, cb) {
      var dataSource = this.dataSource,
        connector = dataSource.connector,
        deferred = Q.defer();

      connector.mandrill.subaccounts.info({id: id}, function (result) {
        deferred.resolve(result);
        cb && cb(null, result);
      }, function (error) {
        deferred.resolve(error);
        cb && cb(error);
      });

      return deferred.promise;

    },
    update: function (subaccount, cb) {

      var dataSource = this.dataSource,
        connector = dataSource.connector,
        deferred = Q.defer();


      connector.mandrill.subaccounts.update(subaccount, function (result) {
        deferred.resolve(result);
        cb && cb(null, result);
      }, function (error) {
        deferred.resolve(error);
        cb && cb(error);
      });

      return deferred.promise;
    },
    delete: function (id, cb) {
      var dataSource = this.dataSource,
        connector = dataSource.connector,
        deferred = Q.defer();

      connector.mandrill.subaccounts.delete({id: id}, function (result) {
        deferred.resolve(result);
        cb && cb(null, result);
      }, function (error) {
        deferred.resolve(error);
        cb && cb(error);
      });

      return deferred.promise;

    },
    pause: function (id, cb) {
      var dataSource = this.dataSource,
        connector = dataSource.connector,
        deferred = Q.defer();

      connector.mandrill.subaccounts.pause({id: id}, function (result) {
        deferred.resolve(result);
        cb && cb(null, result);
      }, function (error) {
        deferred.resolve(error);
        cb && cb(error);
      });

      return deferred.promise;

    },
    resume: function (id, cb) {
      var dataSource = this.dataSource,
        connector = dataSource.connector,
        deferred = Q.defer();

      connector.mandrill.subaccounts.resume({id: id}, function (result) {
        deferred.resolve(result);
        cb && cb(null, result);
      }, function (error) {
        deferred.resolve(error);
        cb && cb(error);
      });

      return deferred.promise;
    }
  }
};
