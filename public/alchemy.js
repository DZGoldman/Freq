// All alchemy functionality (getting seniment and coloring accordingly) goes here
$('#intro').fadeOut(7000)

setTimeout(sentimize, 2500)
setInterval(sentimize, 5000)


var counter = 0
// Main function; starts the chain for all the others
function sentimize() {
  var text = $output.text()
  // only run 16 per page visit
  counter++
  if (counter >16) return false
  // don't run if there is no text
  if (text.trim().length ==0) return false
  getSentiment(text)
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
//get sentiment data from server (returns promise)
function getSentiment(str) {
  return $.ajax({
    type: 'post',
    url: '/alchemy',
    data: {
      text: str,
    }
  })
}

// Scale sentiment score to corresponding color, in rgb form
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

// Animation for changing text color, uses Jquery UI
function sentColorize(color) {
  // for each letter
  $('span').each(function(index, $letter) {
    // at evenly spaced time increments
    setTimeout(blacken, 25 * index)
    // first make text black/invisible
    function blacken() {
      $($letter).animate({
          color: 'black'
        }, 30,
        colorize)
    }
    // then ease it to appropriate color
    function colorize() {
      $($letter).animate({
        color: color
      }, 400)
    }
  })
}

// get rate limit (just to use in browswer window)
function rateLimit() {
  $.get('limit').done(function(data) {
    console.log(data);
  })
}

// show message about rate limit being reached
function limitReached() {
  $('#limit').show()
}
