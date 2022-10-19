module.exports.verifySetup = (app, vonage) => {


  
  app.get('/', (request, response) => {
    
    const error = request.cookies.error;
    response.clearCookie('error');

    const user = request.cookies.user;
    const verifyRequestId = request.cookies.verifyRequestId;
    const verifyRequestPhone = request.cookies.verifyRequestPhone;

    // If the user is not logged in and a verification is not in progress, show the verification start page
    if(!user && !verifyRequestId) {
      response.render('_verify/start', { error });
      return;
    }
    
    // If the user is not logged in and a verification is in progress, show the verification check page
    if(verifyRequestId) {
      response.render('_verify/check', { error, verifyRequestId, verifyRequestPhone });
      return;
    }
    
    // Else, the user is logged in, show the index page
    response.render('_verify/index', { error, user });
  });



  app.post('/verify/start', (request, response) => {

    const phone = request.body.phone;
    if(!phone) {
      response.cookie('error', 'Please enter a phone number');
      response.redirect('/');
      return;
    }
    // Switch from sms in finnish to call in spanish
    //vonage.verify.request({ number: phone, brand: 'Vonage', lg: 'es-es', workflow_id: '7'}, (error, result) => {
      vonage.verify.request({ number: phone, brand: 'Vonage'}, (error, result) => {
      if (error) {
        response.clearCookie('verifyRequest');
        response.cookie('error', JSON.stringify(error));
      } else {
        console.log(result);
        if(result.request_id) {
          response.cookie('verifyRequestId', result.request_id);
          response.cookie('verifyRequestPhone', phone);
        } else {
          response.cookie('error', `No request_id returned<br/>JSON.stringify(result)`);
          response.clearCookie('verifyRequestId');
          response.clearCookie('verifyRequestPhone');
        }
      }
      response.redirect('/');
    });
  });



  app.post('/verify/check', (request, response) => {
    let code = request.body.code;
    const verifyRequestId = request.cookies.verifyRequestId;
    const verifyRequestPhone = request.cookies.verifyRequestPhone;

    if(!verifyRequestId || !verifyRequestPhone) {
      response.cookie('error', 'No verification request found');
      response.redirect('/');
      return;
    }
    if(!code) {
      response.cookie('error', 'No code was provided');
      response.redirect('/');
      return;
    }

    vonage.verify.check({ request_id: verifyRequestId, code: code }, (error, result) => {
      if (error) {
        response.cookie('error', JSON.stringify(error));
      } else {
        console.log(result);
        if (result.status == 0) {
          // User provided correct code
          response.cookie('user', verifyRequestPhone);
          response.clearCookie('verifyRequestId');
          response.clearCookie('verifyRequestPhone');
        } else {
          response.cookie('error', `Incorrect code provided<br/>JSON.stringify(result)`);
        }
      }
      response.redirect('/');
    });
  });



  app.get('/verify/logout', (request, response) => {
    response.clearCookie('verifyRequestId');
    response.clearCookie('verifyRequestPhone');
    response.clearCookie('user');
    response.redirect('/'); 
  });
  
  
};