## Installation

````sh
npm install {name} --save
````

## Configuration

### Sendgrid API key

Use the following configuration if you have an api key.

datasources.json

    {
        "sendgrid": {
            "connector": "loopback-connector-sendgrid",
            "api_key": '[your api key here]'
        }
    }

model-config.json

    {
        "Email": {
            "dataSource": "sendgrid",
            "public": false
        }
    }

Configuration in JavaScript

    var DataSource = require('loopback-datasource-juggler').DataSource;
    var dsSendGrid = new DataSource('loopback-connector-sendgrid', {
        api_key: '[your api key here]'
    });
    loopback.Email.attachTo(dsSendGrid);

### Sendgrid settings
Using sendgrid mail_settings and tracking_settings:
datasources.json

    {
        "sendgrid": {
            "connector": "loopback-connector-sendgrid",
            "api_key": '[your api key here]',
            "mail_settings": {[your mail_settings JSON object]},
            "tracking_settings": {[your tracking_settings JSON object]}
        }
    }

## Usage

Basic option same as built in Loopback:

    loopback.Email.send({
        to: "test@to.com",
        from: "test@from.com",
        subject: "subject",
        text: "text message",
        html: "html <b>message</b>"
    },
    function(err, result) {
        if(err) {
            console.log('Upppss something crash');
            return;
        }
        console.log(result);
    });

Advanced options using the sendGridConfig option:

    loopback.Email.send({
        to: "test@to.com",
        from: "test@from.com",
        subject: "subject",
        text: "text message",
        html: "html <b>message</b>",
        sendGridConfig: {
            personalizations: ...,
            template_id: ...,
            sections: ...,
            headers: ...,
            categories: ...,
            custom_args: ...,
            send_at: ...,
            batch_id: ...,
            asm: ...,
            ip_pool_name: ...,
            reply_to: ...
        }
    },
    function(err, result) {
        if(err) {
            console.log('Upppss something crash');
            return;
        }
        console.log(result);
    });
