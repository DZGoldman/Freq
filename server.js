const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const AlchemyAPI = require('alchemy-api');

require('dotenv').config({
  silent: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan('combined'));
app.use(express.static(__dirname + '/public'));

app.post('/alchemy', function(req, res) {
  console.log('hellothere');
  console.log(req.body.text);
  var alchemy = new AlchemyAPI(process.env.PORT);
  alchemy.sentiment(req.body.text, {}, function(err, response) {
    if (err) throw err;

    // See http://www.alchemyapi.com/api/ for format of returned object
    var sentiment = response.docSentiment;
    res.send(sentiment)
    // Do something with data
  })
})
//
// app.get('/', function(req, res){
//   res.sendFile(__dirname+'/public/index.html')
// });


app.listen(3000, function() {
  console.info('Listening on  port ' + process.env.PORT)
})
