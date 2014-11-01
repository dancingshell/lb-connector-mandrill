/**
 * Dependencies
 */


var Mandrill = require('mandrill-api/mandrill'),
  assert = require('assert'),
  loopback = require('../../loopback');

/**
 * Export the connector class
 */

module.exports = MandrillConnector;

/**
 * Configure and create an instance of the connector
 */

function MandrillConnector(settings) {

  assert(typeof settings === 'object', 'cannot init connector without settings');

  if(loopback.isServer) {
    this.mandrill = new Mandrill.Mandrill(settings.apikey);
  }
}

MandrillConnector.initialize = function(dataSource, callback) {

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

Mailer.send = function (options, fn) {
  var dataSource = this.dataSource,
      settings = dataSource && dataSource.settings,
      connector = dataSource.connector;

  assert(connector, 'Cannot send mail without a connector!');

  if(connector.mandrill) {

    if(typeof options.from === 'string') {
      options.from_email = options.from
    }
    else if(typeof options.from === 'object') {
      options.from_name = options.from.name;
      options.from_email = options.from.email;
    }

    delete options.from;

    if(typeof options.to === 'string') {
      //var to;
      //to = options.to.split(',');
      //if(typeof to === 'string') {
      //  to = [to];
      //}
      //console.log(to);
      //to.forEach(function(email, index) {
      //  to[index] = { email: email };
      //});
    }
    else if(typeof options.to === 'object') {
      options.to = [options.to];
    }

    if(options.template) {
      assert(options.template.name, 'template name should be defined');
      assert(options.template.content, 'template content should be defined');
      assert(typeof options.template.content === 'object', 'template content as wrong format');

      var template_name = options.template.name;
      var template_content = [options.template.content];
      delete options.template;
      var options = {
        template_name: template_name,
        template_content: template_content,
        message: options
      }
      connector.mandrill.messages.sendTemplate(options, function(result) { fn(null, result); }, function(err) { fn(err, null); });
    }
    else {
      connector.mandrill.messages.send({ message: options }, function(result) { fn(null, result); }, function(err) { fn(err, null); });
    }
  } else {
    console.warn('Warning: no connectiom with Mandrill');
    process.nextTick(function() {
      fn(null, options);
    });
  }
};

/**
 * Send an email instance using instance
 */

Mailer.prototype.send = function (fn) {
  this.constructor.send(this, fn);
};
//
///**
// * Access object.
// */
//
//MandrillConnector.mailer =
//MandrillConnector.prototype.mailer =
//Mailer.mailer =
//Mailer.prototype.mailer = mandrill;
