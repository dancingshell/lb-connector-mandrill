# loopback-connector-sendgrid
[![view on npm](http://img.shields.io/npm/v/loopback-connector-sendgrid.svg?style=flat)](https://www.npmjs.org/package/loopback-connector-sendgrid)
[![npm module downloads per month](http://img.shields.io/npm/dm/loopback-connector-sendgrid.svg?style=flat)](https://www.npmjs.org/package/loopback-connector-sendgrid)
[![Dependency status](https://david-dm.org/Cellarise/loopback-connector-sendgrid.svg?style=flat)](https://david-dm.org/Cellarise/loopback-connector-sendgrid)
[![Build Status](https://travis-ci.org/Cellarise/loopback-connector-sendgrid.svg?branch=master)](https://travis-ci.org/Cellarise/loopback-connector-sendgrid)
[![Code
Climate](https://codeclimate.com/github/Cellarise/loopback-connector-sendgrid/badges/gpa.svg)](https://codeclimate.com/github/Cellarise/loopback-connector-sendgrid)
[![Test Coverage](https://codeclimate.com/github/Cellarise/loopback-connector-sendgrid/badges/coverage.svg)](https://codeclimate.com/github/Cellarise/loopback-connector-sendgrid/badges/coverage.svg)

> Loopback connector module which allow to send emails via SendGrid


## Installation

````sh
npm install loopback-connector-sendgrid --save
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
            console.log('Upppss something crash', err);
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
            templateId: ...,
            sections: ...,
            headers: ...,
            categories: [{category: 'your-category'}],
            sendAt: ...,
            batchId: ...,
            asm: ...,
            ipPoolName: ...,
            replyTo: ...
        }
    },
    function(err, result) {
        if(err) {
            console.log('Upppss something crash', err);
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
        <td colspan=4><strong>Version: 2.0.6 - released 2016-09-03</strong></td>
      </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10403&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Bug</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-37</td>
            <td><p>Fix faulty &#39;to&#39; parsing #15</p><p></p></td>
          </tr>


<tr>
        <td colspan=4><strong>Version: 2.0.5 - released 2016-08-29</strong></td>
      </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10403&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Bug</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-36</td>
            <td><p>Fix sendGridLib.SendGrid is not a function #14</p><p></p></td>
          </tr>


<tr>
        <td colspan=4><strong>Version: 2.0.4 - released 2016-08-25</strong></td>
      </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-35</td>
            <td><p>Readme: Clarify type of sendGridConfig.categories  - must be an object, not string #11</p><p></p></td>
          </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-32</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-33</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10403&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Bug</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-34</td>
            <td><p>Fix Invalid type of To email (found) #13</p><p></p></td>
          </tr>


<tr>
        <td colspan=4><strong>Version: 2.0.3 - released 2016-07-09</strong></td>
      </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10403&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Bug</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-31</td>
            <td><p>Package: Add test steps for 2.0.2 and fix readme</p><p></p></td>
          </tr>


<tr>
        <td colspan=4><strong>Version: 2.0.1 - released 2016-07-08</strong></td>
      </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10403&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Bug</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-30</td>
            <td><p>Package: Fix library to use sendgrid web APIv3 configuration</p><p></p></td>
          </tr>


<tr>
        <td colspan=4><strong>Version: 2.0.0 - released 2016-07-08</strong></td>
      </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-29</td>
            <td><p>Package: Move babel-core from dependencies to devDependencies</p><p></p></td>
          </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-28</td>
            <td><p>Package: Upgrade Sendgrid dependency from ^2.0.0 to ^3.0.4 (upgraded in version 1.2.4)</p><p></p></td>
          </tr>


<tr>
        <td colspan=4><strong>Version: 1.2.4 - released 2016-07-07</strong></td>
      </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-24</td>
            <td><p>Package: update usage documentation to describe configuration of sendgrid api key</p><p></p></td>
          </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10403&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Bug</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-27</td>
            <td><p>Email connector: Fix filters reference to higher scoped var sendgridFilters</p><p></p></td>
          </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-26</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-25</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>


<tr>
        <td colspan=4><strong>Version: 1.2.3 - released 2016-02-16</strong></td>
      </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-23</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>


<tr>
        <td colspan=4><strong>Version: 1.2.2 - released 2015-11-26</strong></td>
      </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-22</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>


<tr>
        <td colspan=4><strong>Version: 1.2.0 - released 2015-10-05</strong></td>
      </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10411&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Feature</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-16</td>
            <td><p>Email connector: Add support for api_key</p><p></p></td>
          </tr>


<tr>
        <td colspan=4><strong>Version: 1.1.4 - released 2015-08-25</strong></td>
      </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-15</td>
            <td><p>Package: Update development dependencies and configure for travis-ci</p><p></p></td>
          </tr>


<tr>
        <td colspan=4><strong>Version: 1.1.3 - released 2015-07-21</strong></td>
      </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-14</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>


<tr>
        <td colspan=4><strong>Version: 1.1.2 - released 2015-07-14</strong></td>
      </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-13</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>


<tr>
        <td colspan=4><strong>Version: 1.1.1 - released 2015-07-01</strong></td>
      </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-12</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>


<tr>
        <td colspan=4><strong>Version: 1.1.0 - released 2015-06-30</strong></td>
      </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10403&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Bug</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-11</td>
            <td><p>Email connector: From address specification mismatch</p><p></p></td>
          </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10411&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Feature</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-10</td>
            <td><p>Email connector: Send message attachments</p><p></p></td>
          </tr>


<tr>
        <td colspan=4><strong>Version: 1.0.3 - released 2015-04-20</strong></td>
      </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-9</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>


<tr>
        <td colspan=4><strong>Version: 1.0.2 - released 2015-02-23</strong></td>
      </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-8</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-7</td>
            <td><p>Package: Update eslint configuration, test.js runner and dev dependencies</p><p></p></td>
          </tr>


<tr>
        <td colspan=4><strong>Version: 1.0.1 - released 2015-02-03</strong></td>
      </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10403&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Bug</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-6</td>
            <td><p>Email connector: Email subject line not set</p><p></p></td>
          </tr>


<tr>
        <td colspan=4><strong>Version: 1.0.0 - released 2015-02-03</strong></td>
      </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10411&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Feature</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-5</td>
            <td><p>Email connector: Add sendgrid filters passthrough from datasource</p><p></p></td>
          </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10411&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Feature</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-4</td>
            <td><p>Email connector: Add sendgrid options passthrough from datasource</p><p></p></td>
          </tr>


<tr>
        <td colspan=4><strong>Version: 0.1.1 - released 2015-02-03</strong></td>
      </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-3</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>


<tr>
        <td colspan=4><strong>Version: 0.1.0 - released 2015-02-02</strong></td>
      </tr>

<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.nhvr.net:80/secure/viewavatar?size=xsmall&amp;avatarId=10411&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Feature</td>
            <td style="width:80px;text-align:left;">MDLPCNSG-2</td>
            <td><p>Email connector: Add a loopback connector for sending emails from SendGrid</p><p></p></td>
          </tr>


</table>



# License

MIT License (MIT). All rights not explicitly granted in the license are reserved.

Copyright (c) 2015 John Barry
## Dependencies
[loopback-connector-sendgrid@2.0.5](&quot;https://github.com/Cellarise/loopback-connector-sendgrid&quot;) - &quot;MIT License (MIT)&quot;,
*documented by [npm-licenses](http://github.com/AceMetrix/npm-license.git)*.
