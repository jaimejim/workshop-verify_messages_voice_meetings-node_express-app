# Vonage Workshop using Server SDK for Node.js

This is a sample app showcasing the Vonage APIs.

## Requirements

- a Vonage Developer Account - register at https://dashboard.nexmo.com
- the latest version of Node.js - instructions & install packages are available at https://nodejs.org/en/
- ngrok - install and setup instructions at https://ngrok.com/

## Installation

1. Make a copy of `env.sample`:

```sh
cp env.sample .env
```

2. Open `.env` and add your Vonage api key and secret, available on your [Vonage Dashboard](https://dashboard.nexmo.com/settings). 

3. In the Dashboard, create a new Vonage application and place the given `private.key` inside the project.

4. Add the id of the app you just created as `APP_ID` to `.env`.

5. [Buy a number](https://dashboard.nexmo.com/buy-numbers) (or reuse an existing one), link it to your Vonage app and add it as `VONAGE_NUMBER` to `.env`.

6. Install dependencies:

```sh
npm install
```

7. Install `nodemon`:

```sh
npm install --location=global nodemon
```

## Start the app

To start the app:

```sh
nodemon -e js,mustache server.js
```

Also start `ngrok` to make webhook available, making sure to alter the path to your local ngrok installation as required:

```sh
~/ngrok http 3000
```

## Update Vonage app webhooks

In the Vonage Dashboard, enable Voice, Messages and Meetings capabilities for your application and use the following URLs:

- Messages
  - **https://subdomain.ngrok.io/messages/inbound** - for Inbound URL
  - **https://subdomain.ngrok.io/messages/status** - for Status URL
- Voice
  - **POST: https://subdomain.ngrok.io/voice/answer** - for Answer URL
  - **POST: https://subdomain.ngrok.io/voice/event** - for Event URL
- Meetings
  - **https://subdomain.ngrok.io/meetings/rooms** - for Rooms URL
  - **https://subdomain.ngrok.io/meetings/sessions** - for Sessions URL
  
# Ready

Launch a web browser and navigate to http://localhost:3000


