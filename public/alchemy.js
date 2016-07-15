setInterval(sentimize, 5000)
var counter = 0
function sentimize() {
  rateLimit();
  counter++
  console.log(counter);
  if (counter > 20) return false

  getSentiment($output.text())
    .done(function(data) {
      var score = data.score
      var color = getRGB(score)
      sentColorize(color)
    })
    .fail(function(data) {
      console.log(data);
    })
}

function getSentiment(str) {
  return $.ajax({
    type: 'post',
    url: '/alchemy',
    data: {
      text: str,
    }
  })
}

function getRGB(score) {
  if (!score) score = 0;
  if (score >= 0) {
    var scale = Math.floor(255 - (255 * score));
    var color = 'rgb(' + scale + ',255,' + scale + ')'
  } else {
    var scale = Math.floor(255 + (255 * score));
    var color = 'rgb(255,' + scale + ',' + scale + ')'
  }
  sentColorize(color)
}

function sentColorize(color) {
  $('span').each(function(index, $letter) {
    setTimeout(blacken, 30 * index)
    function blacken() {
      $($letter).animate({
          color: 'black'
        }, 150,
        colorize)
    }
    function colorize() {
      $($letter).animate({
        color: color
      }, 500)
    }
  })
}

function rateLimit() {
  $.get('limit').done(function(data) {
    if (data) {
      console.log(data);
    };
  })
}
