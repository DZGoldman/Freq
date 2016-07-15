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
  var alchemy = new AlchemyAPI(process.env.KEY);
  alchemy.apiKeyInfo({}, function(err, response) {
    if (err) throw err;
    if(response.status == 'OK'){
      alchemy.sentiment(req.body.text, {}, function(err, response) {
        if (err) throw err;
        var sentiment = response.docSentiment;
        res.send(sentiment)
      })
    }else{
      res.send({limit_reached: true})
    }
  })
})

app.get('/limit', function (req, res) {
  var alchemy = new AlchemyAPI(process.env.KEY);
  alchemy.apiKeyInfo({}, function(err, response) {
    if (err) throw err;
    console.log('Status:', response.status, 'Consumed:', response.consumedDailyTransactions, 'Limit:', response.dailyTransactionLimit);
    res.send(response)
  });
})

app.listen(3000, function() {
  console.info('Listening on  port ' + process.env.PORT)
})
