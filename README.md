# Vonage Workshop using Server SDK for Node.js

This is a sample app showcasing the Vonage APIs.

## Installation

1. Make a copy of `env.sample`:

```sh
cp env.sample .env
```

2. Open `.env` and add your Vonage credentials. 

3. Place your application `private.key` inside the project.

4. Install libraries:

```sh
npm install
```

5. Install `nodemon`:

```sh
npm install --location=global nodemon
```

## Start the app

To start the app:

```sh
nodemon -e js,mustache server.js
```
