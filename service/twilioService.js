
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
 
function sendMessage() {
  client.messages
    .create({
      body: 'your food is ready',
      from: '+12565488056', // Your Twilio number
      to: '+12265039330'   // Destination number
    })
    .then(message => console.log(message.sid));
    
}

  
  module.exports = {sendMessage};