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

// receives text, send sentiment data
app.post('/alchemy', function(req, res) {
  var alchemy = new AlchemyAPI(process.env.KEY);
  var text = req.body.text;
  alchemy.sentiment(text, {}, function(err, response) {
    console.log(response);
    if (err) throw err;
    if (response.status == 'ERROR' && response.statusInfo == 'daily-transaction-limit-exceeded') {
      res.send({
        error: true,
        limit_reached: true
      })
    } else if (response.status == 'ERROR' && response.statusInfo == 'unsupported-text-language') {
      res.send({
        error: true,
        unsupported_text_language: true
      })
    } else {
      var sentiment = response.docSentiment;
      sentiment.length = text.length
      res.send(sentiment)
    }
  })
})

// show rate limit
app.get('/limit', function(req, res) {
  var alchemy = new AlchemyAPI(process.env.KEY);
  alchemy.apiKeyInfo({}, function(err, response) {
    if (err) throw err;
    console.log('Status:', response.status, 'Consumed:', response.consumedDailyTransactions, 'Limit:', response.dailyTransactionLimit);
    res.send(response)
  });
})

app.listen(process.env.PORT, function() {
  console.info('Listening on  port ' + process.env.PORT)
})
