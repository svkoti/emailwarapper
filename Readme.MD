A package provide an abstraction between multiple email service providers.
If one of the services goes down, it will failover to another provider.

Currently supported:
- [Mailgun](http://www.mailgun.com)
- [SendGrid](https://sendgrid.com)


Installation
------------

```
npm install
```

Usage
-----
npm start

Testing
-------

Yet to add test cases
```

To run tests do:
```
npm test
```

TODO
----

- Payload validation based on route options and a model class
- unit test cases for all scenarios
- validations: mail, to list count ewtc.
- authentication: interrceptor plugin to authenticate token
