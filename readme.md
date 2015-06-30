# loopback-connector-sendgrid
[![view on npm](http://img.shields.io/npm/v/loopback-connector-sendgrid.svg?style=flat)](https://www.npmjs.org/package/loopback-connector-sendgrid)
[![npm module downloads per month](http://img.shields.io/npm/dm/loopback-connector-sendgrid.svg?style=flat)](https://www.npmjs.org/package/loopback-connector-sendgrid)
[![Dependency status](https://david-dm.org/Cellarise/loopback-connector-sendgrid.svg?style=flat)](https://david-dm.org/Cellarise/loopback-connector-sendgrid)
[![Coverage](https://img.shields.io/badge/coverage-65%25_skipped:0%25-yellow.svg?style=flat)](https://www.npmjs.org/package/loopback-connector-sendgrid)

> Loopback connector module which allow to send emails via SendGrid


## Installation

````sh
npm install loopback-connector-sendgrid --save
````

## Configuration

datasources.json

    {
        "sendgrid": {
            "connector": "loopback-connector-sendgrid",
            "api_user": '[your username here]'
            "api_key": '[your password here]'
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
        api_user: '[your username here]'
        api_key: '[your password here]'
    });
    loopback.Email.attachTo(dsSendGrid);

## Usage

Basic option same as built in Loopback

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


## API
*documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)*.


# Changelog

<table style="width:100%;border-spacing:0px;border-collapse:collapse;margin:0px;padding:0px;border-width:0px;">
  <tr>
    <th style="width:20px;text-align:center;"></th>
    <th style="width:80px;text-align:center;">Type</th>
    <th style="width:80px;text-align:left;">ID</th>
    <th style="text-align:left;">Summary</th>
  </tr>
    
<tr>
        <td colspan=4><strong>Version: 1.1.0 - released 2015-06-30</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10403&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Bug</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-11</td>
            <td><p>Email connector: From address specification mismatch</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10411&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Feature</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-10</td>
            <td><p>Email connector: Send message attachments</p><p></p></td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 1.0.3 - released 2015-04-20</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-9</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 1.0.2 - released 2015-02-23</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-8</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-7</td>
            <td><p>Package: Update eslint configuration, test.js runner and dev dependencies</p><p></p></td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 1.0.1 - released 2015-02-03</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10403&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Bug</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-6</td>
            <td><p>Email connector: Email subject line not set</p><p></p></td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 1.0.0 - released 2015-02-03</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10411&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Feature</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-5</td>
            <td><p>Email connector: Add sendgrid filters passthrough from datasource</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10411&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Feature</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-4</td>
            <td><p>Email connector: Add sendgrid options passthrough from datasource</p><p></p></td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 0.1.1 - released 2015-02-03</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-3</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 0.1.0 - released 2015-02-02</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10411&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Feature</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-2</td>
            <td><p>Email connector: Add an loopback connector for sending emails from SendGrid</p><p></p></td>
          </tr>
        
    
</table>



# License

MIT License (MIT). All rights not explicitly granted in the license are reserved.

Copyright (c) 2015 John Barry
## Dependencies
[ansi-regex@1.1.1](&quot;https://github.com/sindresorhus/ansi-regex&quot;) - &quot;MIT&quot;, [ansi-styles@2.0.1](&quot;https://github.com/sindresorhus/ansi-styles&quot;) - &quot;MIT&quot;, [asn1@0.1.11](&quot;https://github.com/mcavage/node-asn1&quot;) - &quot;MIT*&quot;, [assert-plus@0.1.5](&quot;https://github.com/mcavage/node-assert-plus&quot;) - &quot;MIT*&quot;, [async@1.3.0](&quot;git+https://github.com/caolan/async&quot;) - &quot;MIT&quot;, [aws-sign2@0.5.0](&quot;https://github.com/mikeal/aws-sign&quot;) - &quot;Apache*&quot;, [bl@0.9.4](&quot;https://github.com/rvagg/bl&quot;) - &quot;MIT&quot;, [bluebird@2.9.30](&quot;https://github.com/petkaantonov/bluebird&quot;) - &quot;MIT&quot;, [boom@2.8.0](&quot;https://github.com/hapijs/boom&quot;) - &quot;BSD-3-Clause&quot;, [caseless@0.10.0](&quot;https://github.com/mikeal/caseless&quot;) - &quot;BSD&quot;, [chalk@1.0.0](&quot;https://github.com/sindresorhus/chalk&quot;) - &quot;MIT&quot;, [combined-stream@1.0.5](&quot;https://github.com/felixge/node-combined-stream&quot;) - &quot;MIT&quot;, [commander@2.8.1](&quot;https://github.com/tj/commander.js&quot;) - &quot;MIT&quot;, [core-util-is@1.0.1](&quot;https://github.com/isaacs/core-util-is&quot;) - &quot;MIT&quot;, [cryptiles@2.0.4](&quot;https://github.com/hapijs/cryptiles&quot;) - [&quot;BSD&quot;], [ctype@0.5.3](&quot;https://github.com/rmustacc/node-ctype&quot;) - &quot;MIT*&quot;, [delayed-stream@1.0.0](&quot;https://github.com/felixge/node-delayed-stream&quot;) - &quot;MIT&quot;, [escape-string-regexp@1.0.3](&quot;https://github.com/sindresorhus/escape-string-regexp&quot;) - &quot;MIT&quot;, [extend@2.0.1](&quot;git+https://github.com/justmoon/node-extend&quot;) - &quot;MIT&quot;, [forever-agent@0.6.1](&quot;https://github.com/mikeal/forever-agent&quot;) - &quot;Apache-2.0&quot;, [form-data@1.0.0-rc1](&quot;https://github.com/felixge/node-form-data&quot;) - [&quot;MIT&quot;], [generate-function@2.0.0](&quot;https://github.com/mafintosh/generate-function&quot;) - &quot;MIT&quot;, [generate-object-property@1.2.0](&quot;https://github.com/mafintosh/generate-object-property&quot;) - &quot;MIT&quot;, [get-stdin@4.0.1](&quot;https://github.com/sindresorhus/get-stdin&quot;) - &quot;MIT&quot;, [graceful-readlink@1.0.1](&quot;https://github.com/zhiyelee/graceful-readlink&quot;) - &quot;MIT&quot;, [har-validator@1.8.0](&quot;git+https://github.com/ahmadnassri/har-validator&quot;) - &quot;ISC&quot;, [has-ansi@1.0.3](&quot;https://github.com/sindresorhus/has-ansi&quot;) - &quot;MIT&quot;, [hawk@2.3.1](&quot;https://github.com/hueniverse/hawk&quot;) - [&quot;BSD&quot;], [hoek@2.14.0](&quot;https://github.com/hapijs/hoek&quot;) - &quot;BSD-3-Clause&quot;, [http-signature@0.11.0](&quot;https://github.com/joyent/node-http-signature&quot;) - &quot;MIT&quot;, [inherits@2.0.1](&quot;https://github.com/isaacs/inherits&quot;) - &quot;ISC&quot;, [is-my-json-valid@2.12.0](&quot;https://github.com/mafintosh/is-my-json-valid&quot;) - &quot;MIT&quot;, [is-property@1.0.2](&quot;https://github.com/mikolalysenko/is-property&quot;) - &quot;MIT&quot;, [isarray@0.0.1](&quot;https://github.com/juliangruber/isarray&quot;) - &quot;MIT&quot;, [isstream@0.1.2](&quot;https://github.com/rvagg/isstream&quot;) - &quot;MIT&quot;, [json-stringify-safe@5.0.1](&quot;https://github.com/isaacs/json-stringify-safe&quot;) - &quot;ISC&quot;, [jsonpointer@1.1.0](&quot;http://github.com/janl/node-jsonpointer&quot;) - &quot;MIT*&quot;, [lodash@3.9.3](&quot;git+https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [loopback-connector-sendgrid@0.0.0](&quot;https://github.com/Cellarise/loopback-connector-sendgrid&quot;) - &quot;MIT License (MIT)&quot;, [mime-db@1.12.0](&quot;https://github.com/jshttp/mime-db&quot;) - &quot;MIT&quot;, [mime-db@1.14.0](&quot;https://github.com/jshttp/mime-db&quot;) - &quot;MIT&quot;, [mime-types@2.0.14](&quot;https://github.com/jshttp/mime-types&quot;) - &quot;MIT&quot;, [mime-types@2.1.2](&quot;https://github.com/jshttp/mime-types&quot;) - &quot;MIT&quot;, [mime@1.3.4](&quot;https://github.com/broofa/node-mime&quot;) - [&quot;MIT&quot;], [node-uuid@1.4.3](&quot;https://github.com/broofa/node-uuid&quot;) - [&quot;MIT&quot;], [oauth-sign@0.8.0](&quot;git+https://github.com/mikeal/oauth-sign&quot;) - &quot;Apache-2.0&quot;, [q@1.4.1](&quot;https://github.com/kriskowal/q&quot;) - &quot;MIT&quot;, [qs@3.1.0](&quot;git+https://github.com/hapijs/qs&quot;) - &quot;BSD-3-Clause&quot;, [ramda@0.15.1](&quot;https://github.com/ramda/ramda&quot;) - &quot;MIT&quot;, [readable-stream@1.0.33](&quot;https://github.com/isaacs/readable-stream&quot;) - &quot;MIT&quot;, [request@2.58.0](&quot;git+https://github.com/request/request&quot;) - &quot;Apache-2.0&quot;, [sendgrid@1.8.0](&quot;https://github.com/sendgrid/sendgrid-nodejs&quot;) - &quot;MIT*&quot;, [smtpapi@1.1.0](&quot;https://github.com/sendgrid/smtpapi-nodejs&quot;) - &quot;BSD&quot;, [sntp@1.0.9](&quot;https://github.com/hueniverse/sntp&quot;) - [&quot;BSD&quot;], [string_decoder@0.10.31](&quot;https://github.com/rvagg/string_decoder&quot;) - &quot;MIT&quot;, [stringstream@0.0.4](&quot;https://github.com/mhart/StringStream&quot;) - &quot;MIT&quot;, [strip-ansi@2.0.1](&quot;https://github.com/sindresorhus/strip-ansi&quot;) - &quot;MIT&quot;, [supports-color@1.3.1](&quot;https://github.com/sindresorhus/supports-color&quot;) - &quot;MIT&quot;, [tough-cookie@2.0.0](&quot;https://github.com/SalesforceEng/tough-cookie&quot;) - &quot;BSD-3-Clause&quot;, [tunnel-agent@0.4.0](&quot;https://github.com/mikeal/tunnel-agent&quot;) - &quot;Apache*&quot;, [xtend@4.0.0](&quot;https://github.com/Raynos/xtend&quot;) - [&quot;MIT&quot;], 
*documented by [npm-licenses](http://github.com/AceMetrix/npm-license.git)*.