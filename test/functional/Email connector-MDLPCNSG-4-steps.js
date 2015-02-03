"use strict";
/* Feature: Email connector: Add sendgrid options passthrough from datasource */
module.exports = (function testSuite() {
  var English = require("yadda").localisation.English;
  var assert = require("assert");
  var DataSource = require('loopback-datasource-juggler').DataSource;
  var loopback = require('loopback');
  return English.library()
  /*Scenario: Pass options from datasource */
.define("When initiated with datasource options",
      function test(done) {
        var Email = loopback.Email.extend('testEmail');
        var Connector = this.world.connector;
        var self = this;
        var ds;
        try {
          Connector.__set__('sendGridLib', this.world.__sendgridmock__);
          ds = new DataSource({
            "connector": Connector,
            "api_user": 'testuser',
            "api_key": 'password',
            "options": {
              "uri": "http://sendgrid.org:80/send"
            }
          });

          Email.attachTo(ds);
          this.world.datasource = ds;
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
          return done();
        }
        self.world.error = false;
        done();
      })
.define("And the options are made available to sendgrid",
      function test(done) {
        var Connector = this.world.connector;
        assert(Connector.__get__('sendgridInstance').options.uri);
        done();
      });
})();
