var botId = "st-f57ed987-5d13-5dd7-9c68-9c1cca120965";
var botName = "Order Management";
var sdk = require("./lib/sdk");

/*
 * This is the most basic example of BotKit.
 *
 * It showcases how the BotKit can intercept the message being sent to the bot or the user.
 *
 * We can either update the message, or chose to call one of 'sendBotMessage' or 'sendUserMessage'
 */
module.exports = {
    botId   : botId,
    botName : botName,

    on_user_message : function(requestId, data, callback) {
        //console.log("Data ===> ", data.context.session.BotUserSession.lastMessage)
        if (data.message === "Hi") {
            data.message = "Hello";
            //console.log("user message",data.message);
            //Sends back 'Hello' to user.
            return sdk.sendUserMessage(data, callback);
        } else if(!data.agent_transfer){
            //Forward the message to bot
            return sdk.sendBotMessage(data, callback);
        } else {
            data.message = "Agent Message";
            return sdk.sendUserMessage(data, callback);
        }
    },
        on_bot_message  : function(requestId, data, callback) {
        if (data.message === 'hello') {
            data.message = 'The Bot says hello!';
            console.log('on_bot_message ---> event type', !data?.event ? 'not found': data?.event)
        }
            
            // console.log('on_bot_message ---> BotUserSession: ', data.context.session.BotUserSession);
            console.log('on_bot_message ---> logArray: ', data.context.session.BotUserSession.logArray);
        
            //Sends back the message to user
            // console.log("on_bot_message --> Data :",JSON.stringify(data))
            // console.log("on_bot_message -->reqId :",JSON.stringify(requestId))
        
        return sdk.sendUserMessage(data, callback);
            
    },
    on_agent_transfer : function(requestId, data, callback){
        return callback(null, data);
    },
    on_event : function (requestId, data, callback) {
        
            // console.log("on_event --->  Event : ", data.event);
            // console.log('test message')
            // data.event.eventType === 'endDialog' ? console.log(data.context.session.BotUserSession):console.log('condition false')
        if(data.event.eventType === "endDialog"){
            console.log('on_event ---> logArray:', data.context.session.BotUserSession.logArray);
            return callback(null, data);
        } else{
            console.log('on_event ---> event type:', data.event.eventType);
            return callback(null, data);
        }        
    },
    on_alert : function (requestId, data, callback) {
        // console.log("on_alert -->  : ", data, data.message);
        return sdk.sendAlertMessage(data, callback);
    }

};


