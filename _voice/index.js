let { showRequest } = require('../utils/utils.js');

module.exports.voiceSetup = (app, vonage) => {
  

  app.get('/voice', (request, response) => {
    const voiceStatus = request.cookies.voiceStatus;
    response.clearCookie('voiceStatus');
    const voiceData = request.cookies.voiceData;
    response.clearCookie('voiceData');
    const vonageNumber = process.env.VONAGE_NUMBER
    response.render('_voice/index', { voiceStatus, voiceData, vonageNumber });
  });


  app.post('/voice/talk', (request, response) => {
    vonage.calls.create({
      to: [{ type: 'phone', number: request.body.phone }],
      from: { type: 'phone', number: process.env.VONAGE_NUMBER },
      ncco: [{ "action": "talk", "text": request.body.message }]
    }, (err, data) => {
      if (err) {
        response.cookie('voiceStatus', 'Call not placed');
        response.cookie('voiceData', JSON.stringify(err));
      } else {
        console.log(data);
        response.cookie('voiceStatus', 'Call placed successfully');
        response.cookie('voiceData', JSON.stringify(data, null, '\r\n'));
      }
      response.redirect('/voice');
    })
  });


  app.post('/voice/event', showRequest);


  app.post('/voice/answer', (request, response) => {
    console.log(request.body);
    const from = request.body.from
    response.json([
      { 
        "action": "talk", 
        "text": `<speak>Thank you for calling from <say-as interpret-as='telephone'>${from}</say-as> <break time='1s' /> Press 1 for the current time <break strength='weak' /> 2 to play an audio file <break strength='weak' /> or 3 to find out how to pronounce <break strength='weak' />tomato.</speak>`,
        "bargeIn": true
      },
      {
        action: 'input',
        type: [ 'dtmf' ],
        dtmf: { maxDigits: 1 },
        eventUrl: [`https://${request.get('host')}/voice/dtmf`]
      }
    ]);
  });

  app.post('/voice/dtmf', (request, response) => {
    let ncco = []
    switch (request.body.dtmf.digits) {
      case '1':
        ncco.push({
          action: 'talk',
          text: `It is ${(new Date()).toUTCString()}`,
        });
        break;
      case '2':
        ncco.push({
          action: 'stream',
          streamUrl: [ 'https://nexmo-community.github.io/ncco-examples/assets/voice_api_audio_streaming_vonage.mp3'],
        });
        break;
      case '3':
        ncco.push({
          action: 'talk',
          text: "<speak><phoneme alphabet='ipa' ph='təˈmætoː'>Tomato</phoneme> or <phoneme alphabet='ipa' ph='təˈmeɪtoʊ'>tomato</phoneme>. Two nations separated by a common language.</speak>"
        });
        break;
      default:
        ncco.push({
          action: 'talk',
          text: 'Sorry, I did not understand that.',
        });
    }
    ncco = ncco.concat([
      {
        action: 'talk',
        text: "Pick another option or hang up.",
        "bargeIn": true
      },
      {
        action: 'input',
        type: [ 'dtmf' ],
        dtmf: { maxDigits: 1 },
        eventUrl: [`https://${request.get('host')}/voice/dtmf`]
      }
    ]);
    response.json(ncco);
  });
};
