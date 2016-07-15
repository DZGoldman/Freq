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
  var alchemy = new AlchemyAPI(process.env.KEY);

  alchemy.sentiment(req.body.text, {}, function(err, response) {
    if (err) throw err;

    // See http://www.alchemyapi.com/api/ for format of returned object
    var sentiment = response.docSentiment;
    res.send(sentiment)
    // Do something with data
  })
})

app.get('/limit', function (req, res) {
  var alchemy = new AlchemyAPI(process.env.KEY);
  alchemy.apiKeyInfo({}, function(err, response) {
    if (err) throw err;
    // Do something with data
    console.log('Status:', response.status, 'Consumed:', response.consumedDailyTransactions, 'Limit:', response.dailyTransactionLimit);
    res.send(response)
  });
})

app.listen(3000, function() {
  console.info('Listening on  port ' + process.env.PORT)
})
