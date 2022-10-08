'use strict';

require('dotenv').config();

// Configure Vonage instance
const Vonage = require("@vonage/server-sdk");
const vonage = new Vonage({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  applicationId: process.env.APP_ID,
  privateKey: process.env.PRIVATE_KEY
});

// Configure Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname);


// Verify
let { verifySetup } = require('./_verify');
verifySetup(app, vonage);

// Messages
let { messagesSetup } = require('./_messages');
messagesSetup(app, vonage);

// Voice
let { voiceSetup } = require('./_voice');
voiceSetup(app, vonage);

// Meetings
let { meetingsSetup } = require('./_meetings');
meetingsSetup(app, vonage);

// Start the server
app.listen(3000, () => {
  console.log(`Server started at http://localhost:3000`);
});
