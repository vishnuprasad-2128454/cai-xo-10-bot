// var Application = require("./lib/app");
// var Server      = require("./lib/server");
var sdk         = require("./lib/sdk");
// var config      = require("./config");

// var app    = new Application(null, config);
// var server = new Server(config, app);

const express = require('express');
const bodyparser = require("body-parser");
const APIKeyMiddleware = require("./lib/app/middlewares/APIKeyMiddleware");
const app = express()
const port = 8003;

sdk.checkNodeVersion();

app.use(bodyparser());

var apikeyMW = APIKeyMiddleware({});
app.use('../sdk/', apikeyMW);

app.listen(port , function(){
    var host = 'localhost';
    console.info('app listening at http://%s:%s', host, port);
});

// server.start();

// sdk.registerBot(require('./FindAFlight.js'));
sdk.registerBot(require('./SimpleConversationalBot.js'));
// sdk.registerBot(require('./SimpleConversationalBotWithMultipleBotId.js'));
// sdk.registerBot(require('./GuessTheNumber.js'));
// sdk.registerBot(require('./BookACab.js'));
// sdk.registerBot(require('./OrderAPizza.js'));
// sdk.registerBot(require('./BotVariables.js'));
// sdk.registerBot(require('./LiveChat.js'));
