let { showRequest } = require('../utils/utils.js');

module.exports.meetingsSetup = (app, vonage) => {

  app.get('/meetings', (request, response) => {
    const jwt = vonage.generateJwt();
    response.render('_meetings/index', { jwt });
  });

  app.post('/meetings/rooms', showRequest);
  app.post('/meetings/sessions', showRequest);

};
