"use strict";
/* Feature: Email connector: Add sendgrid filters passthrough from datasource */
module.exports = (function testSuite() {
    var English = require("yadda").localisation.English;
    var assert = require("assert");
    var DataSource = require('loopback-datasource-juggler').DataSource;
    var loopback = require('loopback');
    return English.library()
    /*Scenario: Pass filters from datasource */
      .define("When initiated with datasource $setting",
        function test(_1, done) {
          var Email = loopback.Email.extend('testEmail');
          var Connector = this.world.connector;
          var self = this;
          var ds;
          try {
            Connector.__set__('sendgridInstance', this.world.__sendgridmock__);
            ds = new DataSource({
              "connector": Connector,
              "api_key": 'password',
              "mail_settings": {
                'testMailSetting': {
                  'settings': {
                    'enable': 1
                  }
                }
              },
              "tracking_settings": {
                'testTrackingSetting': {
                  'settings': {
                    'enable': 1
                  }
                }
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
      .define("And the mail_settings are made available to sendgrid",
        function test(done) {
          var Connector = this.world.connector;
          assert(Connector.__get__('sendgridMailSettings').testMailSetting);
          done();
        })
      .define("And the tracking_settings are made available to sendgrid",
        function test(done) {
          var Connector = this.world.connector;
          assert(Connector.__get__('sendgridTrackingSettings').testTrackingSetting);
          done();
        });
  })();
