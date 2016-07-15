setInterval(getSentiment, 5000)

var counter = 0
function getSentiment() {
  counter ++
  console.log(counter);
  if(counter>20) return false
  $.ajax({
      type: 'post',
      url: '/alchemy',
      data: {
        text: $output.text(),
      }
    }).done(function(data) {
      var score = data.score;
      if (!score) score = 0;
      if (score >= 0) {
        var scale = Math.floor(255 - (255 * score));
        var color = 'rgb(' + scale + ',255,' + scale + ')'
      } else {
        var scale = Math.floor(255 + (255 * score));
        var color = 'rgb(255,' + scale + ',' + scale + ')'
      }
      sentColorize(color)
    })
    .fail(function(data) {
      console.log(data);
    })
}

function sentColorize(color) {
  console.log(color);
  $('span').each(function(index, $letter) {
    
    setTimeout(function() {
      $($letter).animate({
        color: 'black'
      }, 150, function () {
        $($letter).animate({
          color: color
        }, 500, function () {

                $($letter).animate({
                  fontSize: '50px'
                }, 10)

        })
      })
    }, 50 * index)
  })
}
