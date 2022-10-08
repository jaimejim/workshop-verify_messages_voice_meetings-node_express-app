module.exports.meetingsSetup = (app, vonage) => {

  
  app.get('/meetings', (request, response) => {
    const meetingStatus = request.cookies.meetingStatus;
    response.clearCookie('meetingStatus');
    const meetingData = request.cookies.meetingData;
    response.clearCookie('meetingData');

    const jwt = vonage.generateJwt();

    response.render('_meetings/index', { meetingStatus, meetingData, jwt });
  });


  app.post('/meetings/create', (request, response) => {
    response.redirect('/meetings');
  });


};