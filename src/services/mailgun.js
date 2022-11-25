'use strict';


var MailgunSDK = require('mailgun-js');

class Mailgun {
    constructor(config) {
        this.apiKey      = config.apiKey || null;
        this.domain      = config.domain || null;

        if (null === this.apiKey){
            throw new Error('Mailgun api key is mandatory');
        }
        if (null === this.domain){
            throw new Error('Mailgun domain is mandatory');
        }
    }

    send(from, to, subject, content){

        var data = {
            from:    from,
            to:      to,
            subject: subject,
            html:    content
        };

        var mailgun = new MailgunSDK({apiKey: this.apiKey, domain: this.domain});

        return new Promise((resolve, reject)=>{
            mailgun.messages().send(data, function (err, body) {

                if (err) {
                    console.log("Err", err.message);
                    reject(err);
                }
                else {
                    resolve(body);
                }
            });
        });

    }
}

module.exports = Mailgun;