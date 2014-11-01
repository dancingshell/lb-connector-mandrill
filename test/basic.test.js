require('./helpers/init.js');

var loopback = require('loopback'),
    rewire = require("rewire"),
    Connector = rewire('../lib/mandrill'),
    DataSource = require('loopback-datasource-juggler').DataSource,
    Email, ds;

var __MandrilMock__ = {
  Mandrill: function(apikey) {
    return {
      apikey: apikey,
      messages: {
        send: function(options, success, error) {
          success([{
            email: options.message.to[0].email,
            status: 'sent',
            _id: 'someidofmessage'
          }]);
        }
      }
    }
  }
}

describe('Mandrill init', function () {
  it('should throw error ', function () {
    expect(function() { new Connector(); }).to.throw();
  });

  it('should have property mandrill with api key', function () {
    var apikey = '123456',
        connector = new Connector({ apikey: apikey });

    expect(connector).to.have.a.property('mandrill');
    expect(connector.mandrill.apikey).to.equal(apikey);
  });

  it('should have property mandrill with api key', function () {
    var apikey = '123456',
      connector = new Connector({ apikey: apikey });

    expect(connector).to.have.a.property('mandrill');
    expect(connector.mandrill.apikey).to.equal(apikey);
  });
});

describe('Mandrill message send', function() {

  beforeEach(function() {
    Connector.__set__('Mandrill', __MandrilMock__);
    ds = new DataSource({
      connector: Connector,
      apikey: '123456'
    });

    Email = loopback.Email.extend('testEmail');
    Email.attachTo(ds);
  });

  it('Should send - Email.send', function(done) {
    var msg = {
      from: 'test@evenemento.co',
      to: 'test2@evenemento.co',
      subject: 'Test subject',
      text: 'Plain text',
      html: 'Html <b>content</b>'
    };

    Email.send(msg, function(err, result) {
      expect(err).to.equal(null);
      expect(result[0].email).to.equal(msg.to[0].email);
      expect(result[0].status).to.equal('sent');
      expect(result[0]._id).to.not.equal(null)
      done();
    });
  });

  it('Should send - Email.prototype.send', function(done) {
    var msg = {
      from: 'test@evenemento.co',
      to: 'test2@evenemento.co',
      subject: 'Test subject',
      text: 'Plain text',
      html: 'Html <b>content</b>'
    };

    var email = new Email(msg);

    email.send(function(err, result) {
      expect(err).to.equal(null);
      expect(result[0].email).to.equal(msg.to[0].email);
      expect(result[0].status).to.equal('sent');
      expect(result[0]._id).to.not.equal(null)
      done();
    });
  });

});
