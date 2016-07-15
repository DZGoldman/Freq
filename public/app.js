var $output = $('#output')

$(window).keydown(function (evt) {
  if (evt.which == 8) {
    $output.children().last().remove();
    var obj = makeObj($('#output').text());
    var arr = makeArray(obj);
    arr = fixRepeats(arr);
    colorize(arr);
  }
})

$(window).keypress(change)


function change(evt) {
  console.log(evt.which);
  var newLetter = String.fromCharCode(evt.which);
  spanifyAdd(newLetter, $output);
  var obj = makeObj($('#output').text());
  var arr = makeArray(obj);
  arr = fixRepeats(arr);
  colorize(arr);
};

//make count object from the string of text
function makeObj(str) {
  // count frequency
  var freqObj = {};
  for (var i = 0; i < str.length; i++) {
    var currentChar = str[i].toLowerCase();
    if (freqObj[currentChar]) {
      freqObj[currentChar]++;
    } else {
      freqObj[currentChar] = 1;
    }
  };
  return freqObj;
};

//make frequencyr array out of object (ranking in order)
function makeArray(obj) {
  var objArray = [];
  for (key in obj) {
    var value = obj[key];
    if (typeof value == 'function') continue;
    var newObj = {};
    newObj[key] = obj[key];
    if (key.charCodeAt(0) >= 97 && key.charCodeAt(0) <= 122) {
      objArray.push(newObj);
    };
  };
  objArray.sort(function(a, b) {
    return a.onlyValue() > b.onlyValue();
  })
  return objArray.reverse();
};

//Combine repeats of freqency so they get same opacity
function fixRepeats(objArray) {
  if(objArray.length==0) return false;
  var newArray = [[objArray[0].onlyKey()]];
  var prevVal = objArray[0].onlyValue();
  for (var i = 1; i < objArray.length; i++) {
    var obj = objArray[i];
    if (obj.onlyValue() == prevVal) {
      newArray.last().push(obj.onlyKey())
    }else{
      newArray.push([obj.onlyKey()]);
    }
    prevVal = obj.onlyValue();
  }
  return newArray;
}

// give each span tag its appropriate opacity
function colorize(objArray) {
  var len = objArray.length;
  for (var i = 0; i < len; i++) {
    var arr = objArray[i];
    for (var j = 0; j < arr.length; j++) {
      var char = arr[j]
      $('.' + char).css('opacity', 1 / (i + 1));
    };
  }
}

// add new letter
function spanifyAdd(char, $target) {
  var $spanTag = $('<span>');
  $spanTag.text(char);
  var newClass = char.toLowerCase();
  var ascii = newClass.charCodeAt(0);
  if (ascii >= 97 && ascii <= 122) {
    $spanTag.attr('class', (newClass))
  } else {
    $spanTag.attr('class', 'other')
  };
  $target.append($spanTag)
}

// Helper methods for objects and arrays:

// Object.prototype.onlyKey = function() {
//   return Object.keys(this)[0]
// };

Object.prototype.onlyValue = function() {
  return this[this.onlyKey()]
}

Array.prototype.last = function () {
  return this[this.length-1]
}

String.prototype.last = function () {
  return this[this.length-1]
}
