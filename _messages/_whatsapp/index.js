const WhatsAppText = require('@vonage/server-sdk/lib/Messages/WhatsAppText');
let { showRequest } = require('../utils/utils.js');

module.exports.whatsappSetup = (app, vonage) => {

  
  app.get('/whatsapp', (request, response) => {
    const messageStatus = request.cookies.messageStatus;
    response.clearCookie('messageStatus');
    const messageData = request.cookies.messageData;
    response.clearCookie('messageData');
    response.render('_whatsapp/form', { messageStatus, messageData });
  });

  app.post('/whatsapp/send', (request, response) => {
    
    const WhatsAppText = require("@vonage/server-sdk/lib/Messages/WhatsAppText");
    const text = new WhatsAppText(request.body.message, request.body.recipient, request.body.sender, process.env.VONAGE_NUMBER);
    console.log(text);

    vonage.messages.send(text, (error, data) => {
      if (error) {
        response.cookie('messageStatus', 'Message not sent');
        response.cookie('messageData', JSON.stringify(error));
      } else {
        console.log(data);
        response.cookie('messageStatus', 'Message sent successfully');
        response.cookie('messageData', JSON.stringify(data));
      }
      response.redirect('/whatsapp');
    });
  });

  app.post('/whatsapp/status', showRequest);
  app.post('/whatsapp/inbound', showRequest);

};