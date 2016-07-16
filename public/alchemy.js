$('#intro').fadeOut(7000)

setTimeout(sentimize, 2500)
setInterval(sentimize, 5000)


var counter = 0
function sentimize() {
  counter++
  if (counter >16) return false
  if ($output.text().trim().length ==0) return false
  getSentiment($output.text())
    .done(function(data) {
      if (data.limit_reached){
         return limitReached()
       }
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
    setTimeout(blacken, 25 * index)
    function blacken() {
      $($letter).animate({
          color: 'black'
        }, 30,
        colorize)
    }
    function colorize() {
      $($letter).animate({
        color: color
      }, 400)
    }
  })
}

function rateLimit() {
  $.get('limit').done(function(data) {
    console.log(data);
  })
}

function limitReached() {
  $('#limit').show()
}
