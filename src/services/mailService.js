"use strict";

var mailgun = require("./mailgun");
var sendgrid = require("./sendgrid");


var mailServices = {
  mailgun,
  sendgrid,
};

class MailService {
  constructor(config) {
    this.config = {
      services: config.services ?? {
        mailgun: {
          apiKey: "",
          domain: "",
        },
        sendgrid: {
          apiKey: "",
        }
      },
      servicesFailoverOrder : config.servicesFailoverOrder ?? ["mailgun", "sendgrid"],
      retryTimes: config.retryTimes ?? 3,
    };
  }

  /**
   *
   * @param serviceName 
   * @param data
   * @returns Promise
   */
  sendViaService(serviceName, data) {
    return new Promise((resolve, reject) => {
      console.log(`Sending via ${serviceName}...`);
      let serviceToCall = `${serviceName}`;
      var Service = new mailServices[serviceToCall](
        this.config.services[serviceName]
      );

      Service.send(data.from, data.to, data.subject, data.content)
        .then((s) => {
          console.log("Emails was successfully sent");
          resolve(s);
        })
        .catch((e) => {
          console.log(`Fail to send via ${serviceName}`);
          reject(e);
        });
    });
  }

  /**
   * Send a email through the send mail service
   *
   * @param from
   * @param to
   * @param subject
   * @param content
   * @returns Promise
   */
  sendMail(from, to, subject, content) {
    var reTryCount = 1;
    var serviceIndex = 0;

    var data = {
      from: from,
      to: to,
      subject: subject,
      content: content,
    };
    return new Promise((resolve, reject) => {
      const retryService = (e) => {
        console.log(
          `serviceIndex: ${serviceIndex}, reTryCount: ${reTryCount}, error: ${e.message}`
        );

        ++serviceIndex;
        if (serviceIndex > this.config.servicesFailoverOrder.length - 1) {
          serviceIndex = 0;
          ++reTryCount;
        }
        if (reTryCount > 3) {
          let message =
            "The message was not sent, all the send mail services are unavailable";
          reject(message);
        }
        this.sendViaService(
          this.config.servicesFailoverOrder[serviceIndex],
          data
        )
          .then(resolve)
          .catch(retryService);
      };

      this.sendViaService(this.config.servicesFailoverOrder[serviceIndex], data)
        .then(resolve)
        .catch(retryService);
    });
  }
}

module.exports = MailService;
