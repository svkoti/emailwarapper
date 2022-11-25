const mailSendHandler = require('./handler/mailSendHandler')
// const mailData = require('./models/mailData');

module.exports = [
  {
    method: 'POST',
    path: '/sendmail',
    handler: mailSendHandler.send,
    options: {
      // validate: {
      //   payload: {}
      // },
      auth: false
    }
  },
]
