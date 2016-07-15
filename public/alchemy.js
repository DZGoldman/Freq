


$('#intro').click(function() {
  console.log('clickedd');
  $.ajax({
      type: 'post',
      url: '/alchemy',
      data: {
        text: 'this is a test',
      }
    }).done(function (data) {
      console.log(data);
    })
    .fail(function(data) {
     console.log(data);
 })
})
