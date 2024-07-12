const sdk = require("./lib/sdk");
var Application = require("./lib/app");
var config      = require("./config");
// const express = require('express');
// const bodyparser = require('body-parser');
// const APIKeyMiddleware = require("./lib/app/middlewares/APIKeyMiddleware");
// const app = express();
const port = "8003";

var app    = new Application(null, config);
app     = app.load();
// app.use(bodyparser());
// const apikeyMW = APIKeyMiddleware({});
// app.use('/sdk/', apikeyMW);

sdk.checkNodeVersion();

app.listen(port , function(){
    const host = "localhost";
    console.info('app listening at http://%s:%s', host, port);
});

sdk.registerBot(require('./SimpleConversationalBot.js'));
