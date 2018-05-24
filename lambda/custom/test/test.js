'use strict'
const express = require('express');  
const bodyParser = require('body-parser');
const app = express();
const https = require('https');


//Set port to 5000 or an evironmentally allocated port
app.set('port', (process.env.PORT || 5000))

//serve static files in the public directory
app.use(express.static('public'));
app.use(express.static('node_modules'));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}))

//Process application/json
app.use(bodyParser.json())
 
function test(){
    var responseString = '';

    var whimsy = require('whimsy');
    var randomWord = whimsy('{{ noun }}');
    console.log(randomWord)


    https.get('https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + randomWord, (res) => {
    // https.get('https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=swan', (res) => {

      res.on('data', (d) => {
        responseString += d;
      });
      res.on('end', function(res) {
        var body = JSON.parse(responseString);
        var string = body[2];
        console.log(string.toString())
      });
    }).on('error', (err) => {
      console.error(err);
    });
}
var server = app.listen(app.get('port'), function () {
    var host = server.address().address
    console.log('Application running on port', app.get('port'))
    test()
})








        // //content of the first result in the result
        // https.get('https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=' + res, (res) => {
        //      res.on('data', (d) => {
        //         innerResponseString += d;
        //     });
        //     res.on('end', function(res) {
        //         var content = JSON.parse(innerResponseString);
                
        //     });
        //     }).on('error', (err) => {
        //     console.error(err);
        //     });
