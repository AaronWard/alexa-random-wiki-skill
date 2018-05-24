var Alexa = require('alexa-sdk');
var https = require('https');
var whimsy = require('whimsy');


exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {
  'LaunchRequest': function () {
    this.emit('GetRandom');
  },
  'GetRandom': function() {
    var mythis = this;
    var responseString = '';

    // Code here to call random word
    var randomWord = whimsy('{{ noun }}');
    console.log(phrase)

    // Code here to call wiki article
    https.get('https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + randomWord, (res) => {

      res.on('data', (d) => {
        responseString += d;
      });
      res.on('end', function(res) {
        //Parse the json result to a string
        var body = JSON.parse(responseString);
        var string = body[2];
        speechOutput = string.toString();

        //send back result
        mythis.emit(':tell', "Okay Aaron, here is a fact about the random word " + randomWord + ". :" + speechOutput);
      });
    }).on('error', (err) => {
      console.error(err);
    });
  },
  'AMAZON.HelpIntent': function () {
      this.emit(':ask', "What can I help you with?", "How can I help?");
  },
  'AMAZON.CancelIntent': function () {
      this.emit(':tell', "Okay!");
  },
  'AMAZON.StopIntent': function () {
      this.emit(':tell', "Goodbye!");
  }
};