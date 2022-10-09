let { showRequest } = require('../utils/utils.js');

module.exports.messagesSetup = (app, vonage) => {

  
  app.get('/messages', (request, response) => {
    const messageStatus = request.cookies.messageStatus;
    response.clearCookie('messageStatus');
    const messageData = request.cookies.messageData;
    response.clearCookie('messageData');
    response.render('_messages/form', { messageStatus, messageData });
  });


  app.post('/messages/send', (request, response) => {

    const SMS = require("@vonage/server-sdk/lib/Messages/SMS");
    const sms = new SMS(request.body.message, request.body.recipient, process.env.VONAGE_NUMBER);

    vonage.messages.send(sms, (error, data) => {
      if (error) {
        response.cookie('messageStatus', 'Message not sent');
        response.cookie('messageData', JSON.stringify(err));
      } else {
        console.log(data);
        response.cookie('messageStatus', 'Message sent successfully');
        response.cookie('messageData', JSON.stringify(data));
      }
      response.redirect('/messages');
    });
  });

  app.post('/messages/status', showRequest);
  app.post('/messages/inbound', showRequest);

};