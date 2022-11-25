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
MailService will return a Promise.


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

- add to send attachments
- add to send HTML/plain content
