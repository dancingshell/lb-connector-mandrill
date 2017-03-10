## lb-connector-mandrill

`lb-connector-mandrill` is the Loopback connector module which allow to send emails via Mandrill.

## 1. Installation
```sh
npm install lb-connector-mandrill --save
```

## 2. Configuration

datasources.json

```js
{
    "mandrill": {
        "connector": "lb-connector-mandrill",
        "apikey": "[your api key here]"
    }
}
```

model-config.json

```js
{
    "Email": {
        "dataSource": "mandrill",
        "public": false
    }
}
```

Additionaly you can set defaults

```js
{
    "mandrill": {
        "connector": "lb-connector-mandrill",
        "apikey": "[your api key here]",
        "defaults": {
            "account": "evenemento",
            "inline_css": true
        }
    }
}
```

Configuration in JavaScript

```js
var DataSource = require('loopback-datasource-juggler').DataSource;
var dsMandrill = new DataSource('lb-connector-mandrill', {
    apikey: '[your api key here]'
});
loopback.Email.attachTo(dsMandrill);
```

## 3. Use

Basic option same as built in Loopback

```js
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
```

Some advantages - now you can use templates from Mandrill

```js
loopback.Email.send({
    to: "test@to.com",
    from: "test@from.com",
    subject: "subject",
    template: {
        name: "signup-confirm",
        content: {
            name: "NewUser Name",
            accountId: "123456"
        }
    }
},
function(err, result) {
    if(err) {
        console.log('Upppss something crash');
        return;
    }
    console.log(result);
});
```

To customize emails using merge_vars
 
#### Single Recipient
```js
var
  params,
  user = {
    firstName: 'Paul',
    email: 'paul@example.com'
  }
  
  params = {
    to: user.email,
    template: {
      name: 'test-email',
    },
    merge_vars: [ 
    //in your mandrill template `*|FIRST_NAME|*`
    {
        name: 'FIRST_NAME',
        content: user.firstName
    }
    ],
    global_merge_vars: [
    //in your mandrill template `*|team|*` or `*|TEAM|*`
    {
        name: 'TEAM',
        content: 'Team Awesome'
    }
    ]
  };
  
  loopback.Email.send( params, function( err, email ) {
      ...
  })
```
        
#### Multiple Recipients 
```js
var
  params,
  users = [
    {
      firstName: 'Kaitlin',
      email: 'kaitlin@example.com'
    },
    {
      firstName: 'Ryan',
      email: 'ryan@example.com'
    }
  ];

params = {
  to: users.map( function( user ) {
    return user.email;
  }),   
  template: {
    name: 'test-email',
  },
  merge_vars: [
    // in your mandrill template `*|FIRST_NAME|*`
    // content is a callback the recieves email and index
    // and returns the value for that merge_var for that user
    {
      name: 'FIRST_NAME',
      content: function( email, index ) {
        return users[ index ].firstName;
      }
    }
  ]
};

loopback.Email.send( params, function( err, email ) {
    ...
})
```
