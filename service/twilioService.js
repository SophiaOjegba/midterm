
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function sendMessage(message) {
  client.messages
    .create({
      body: message,
      from: '+15856696427', // Your Twilio number
      to: '+12268996042'   // Destination number
    })
    .then(message => console.log(message.sid));

}


  module.exports = {sendMessage};
