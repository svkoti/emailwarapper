const boom = require('@hapi/boom')

const MailService = require('../services/mailService')

module.exports = {
  async send (request, h) {
    try {
      var mailService  = new MailService(
        {
          services: {
            mailgun: {
              apiKey: "test-api",
              domain: "test-domain",
            },
            sendgrid: {
              apiKey: "testdrid-api",
            }
          },
          servicesFailoverOrder : ["mailgun", "sendgrid"],
          retryTimes:3,
        }
      );
      var response = mailService.sendMail(request.payload.from, request.payload.to, request.payload.subject, request.payload.content); // get call mailService send
      return h.response(response).code(201)
    } catch (err) {
      console.log(err)
      const errorMessage = 'Could not send the mail.'
      return boom.failedDependency(errorMessage);
    }
  },
}
