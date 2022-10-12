# Vonage Workshop using Server SDK for Node.js

This is a sample app showcasing the Vonage APIs.

## Requirements

- a Vonage Developer Account - register at <https://dashboard.nexmo.com>
- the latest version of Node.js - instructions & install packages are available at <https://nodejs.org/en/>
- ngrok - install and setup instructions at <https://ngrok.com/>

## Installation

1. Make a copy of `env.sample`, named `.env`:

```
  cp env.sample .env
```

2. Open `.env` and add your Vonage api key and secret; they are available on your [Vonage Dashboard](https://dashboard.nexmo.com/settings).

3. Still in the Dashboard, visit "Applications" and then ["Create a new application"](https://dashboard.nexmo.com/applications/new).
   1. Give your new application a name and choose "Generate public and private key".
   2. Your browser will download the private key. Please ensure that you save it as a file named **private.key** inside your project folder.
   3. Add the id of the app you just created as `APP_ID` to `.env`.

4. [Search and buy a number](https://dashboard.nexmo.com/buy-numbers) with SMS & Voice capabilities
   1. Link it to your Vonage app
   2. Add it as `VONAGE_NUMBER` to `.env`.

5. Install project dependencies. In the terminal, inside the project folder, run:

```sh
npm install
```

6. To avoid having to restart your server when the project content changes, you will install `nodemon`, a utility that will monitor for any changes in your source and automatically restart your server:

```sh
npm install --location=global nodemon
```

## Start the app

To start the app:

```sh
nodemon -e js,mustache server.js
```

Also start `ngrok` to make your website available for the Vonage servers to interact with, making sure to alter the path to your local ngrok installation as required:

```sh
~/ngrok http 3000
```

## Update Vonage app webhooks

In the Vonage Dashboard, enable Voice, Messages and Meetings capabilities for your application and use the following URLs, replacing **SUBDOMAIN** with the subdomain given by ngrok:

- Messages
  - **<https://SUBDOMAIN.ngrok.io/messages/inbound>** - for Inbound URL
  - **<https://SUBDOMAIN.ngrok.io/messages/status>** - for Status URL
- Voice
  - ! Select HTTP POST for both Answer and Event URLs.
  - **POST: <https://SUBDOMAIN.ngrok.io/voice/answer>** - for Answer URL
  - **POST: <https://SUBDOMAIN.ngrok.io/voice/event>** - for Event URL
- Meetings
  - **<https://SUBDOMAIN.ngrok.io/meetings/rooms>** - for Rooms URL
  - **<https://SUBDOMAIN.ngrok.io/meetings/sessions>** - for Sessions URL

> Please double-check that you selected HTTP POST for the Voice URLs.

## Ready to go

Launch a web browser and navigate to <http://localhost:3000>
