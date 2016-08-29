"use strict";
/* Feature: Email connector: Add an loopback connector for sending emails from SendGrid */
module.exports = (function testSuite() {
  var English = require("yadda").localisation.English;
  var assert = require("assert");
  var path = require("path");
  var loopback = require('loopback');
  var rewire = require("rewire");
  var DataSource = require('loopback-datasource-juggler').DataSource;
  var __sendgridmock__ = function (apiKey) {
    return {
      "api_key": apiKey,
      "emptyRequest": function emptyRequest() {
        return {};
      },
      "API": function API(request, cb) {
        request.statusCode = 200;
        request.status = 'sent';
        request._id = 'someidofmessage';
        cb(request);
      }
    };
  };
  return English.library()
  /*Scenario: SendGrid init with invalid properties */
    .define("Given the sendgrid connector",
      function test(done) {
        var Connector = rewire(path.join(__dirname, '../../lib/sendgrid'));
        this.world.connector = Connector;
        this.world.__sendgridmock__ = __sendgridmock__;
        assert(true);
        done();
      })
    .define("When initiated without the correct properties",
      function test(done) {
        /* eslint-disable no-unused-vars */
        var connectTest, Connector = this.world.connector;
        var self = this;
        try {
          connectTest = new Connector();
        } catch (err) {
          self.world.error = true;
          self.world.errorMsg = err;
          return done();
        }
        self.world.error = false;
        done();
        /* eslint-enable no-unused-vars */
      })
    .define("Then it should throw an error",
      function test(done) {
        assert(this.world.error);
        return done();
      })/*Scenario: SendGrid init with valid properties */
    .define("When initiated with the correct properties",
      function test(done) {
        var Email = loopback.Email.extend('testEmail');
        var Connector = this.world.connector;
        var self = this;
        var ds;
        try {
          Connector.__set__('sendGridLib', this.world.__sendgridmock__);
          ds = new DataSource({
            "connector": Connector,
            "api_key": 'password'
          });

          Email.attachTo(ds);
          this.world.email = Email;
          this.world.msg = {
            "from": 'test@evenemento.co',
            "to": 'test2@evenemento.co',
            "subject": 'Test subject',
            "text": 'Plain text',
            "html": 'Html <b>content</b>'
          };
        } catch (err) {
          self.world.error = true;
          self.world.errorMsg = err;
          return done();
        }
        self.world.error = false;
        done();
      })
    .define("When initiated with email message with from specified as {name: , address:}",
      function test(done) {
        var Email = loopback.Email.extend('testEmail');
        var Connector = this.world.connector;
        var self = this;
        var ds;
        try {
          Connector.__set__('sendGridLib', this.world.__sendgridmock__);
          ds = new DataSource({
            "connector": Connector,
            "api_key": 'password'
          });

          Email.attachTo(ds);
          this.world.email = Email;
          this.world.msg = {
            "from": {
              "name": 'test',
              "address": 'test@evenemento.co'
            },
            "to": 'test2@evenemento.co',
            "subject": 'Test subject',
            "text": 'Plain text',
            "html": 'Html <b>content</b>'
          };
        } catch (err) {
          self.world.error = true;
          self.world.errorMsg = err;
          return done();
        }
        self.world.error = false;
        done();
      })
    .define("Then it should be initiated without error",
      function test(done) {
        assert(!this.world.error, this.world.errorMsg);
        return done();
      })/*Scenario: Sending an email from Email.send */
    .define("And called using the method Email.send",
      function test(done) {
        var self = this;
        this.world.email.send(this.world.msg, function (err, result) {
          if (err) {
            assert(false);
            return done();
          }
          self.world.result = result;
          assert(true);
          done();
        });
      })
    .define("Then it should send the email",
      function test(done) {
        var result = this.world.result;
        var msg = this.world.msg;
        assert(result.method === 'POST');
        assert(result.path === '/v3/mail/send');
        assert(result.body.from.email === 'test@evenemento.co');
        assert(result.body.subject === msg.subject);
        //assert(result.body.personalizations[0].to[0].email[0] === msg.to);
        assert(result.status === 'sent');
        assert(result._id !== null);
        done();
      })/*Scenario: Sending an email from Email.prototype.send */
    .define("And called using the method Email.prototype.send",
      function test(done) {
        var Email = this.world.email;
        var email = new Email(this.world.msg);
        var self = this;
        email.send(function (err, result) {
          if (err) {
            assert(false);
            return done();
          }
          self.world.result = result;
          assert(true);
          done();
        });
      });
})();
