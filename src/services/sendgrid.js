'use strict';


var SendGridSDKHelper = require('sendgrid').mail;
var SendGridSDK       = require('sendgrid');


class Sendgrid {
    constructor(config) {
        this.apiKey = config.apiKey || null;

        if (null === this.apiKey){
            throw new Error('sendgrid api key is mandatory');
        }
    }

    send(from, to, subject, content){
        var data = {
            from:    from,
            to:      to,
            subject: subject,
            html:    content
        };

        var mail = new SendGridSDKHelper.Mail(
            new SendGridSDKHelper.Email(from),
            subject,
            new SendGridSDKHelper.Email(to),
            new SendGridSDKHelper.Content("text/html", content)
        );
        var sg = SendGridSDK(this.apiKey);
        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
        });


        return new Promise((resolve, reject)=>{
            sg.API(request)
                .then(resolve)
                .catch((error)=>{
                    console.log(`sendgrid error:  ${error.message}, `,error.response.body.errors);
                    reject(error);
                });
        });

    }
}

module.exports = Sendgrid;