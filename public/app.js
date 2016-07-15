var $output = $('#output')

$(window).keydown(function (evt) {
  if (evt.which == 8) {
    $output.children().last().remove();
    var obj = makeObj($('#output').text());
    var arr = makeArray(obj);
    arr = fixRepeats(arr);
    colorize(arr);
    evt.preventDefault();
  }
})

$(window).keypress(change)

function change(evt) {
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
    return onlyValue(a) > onlyValue(b);
  })
  return objArray.reverse();
};

//Combine repeats of freqency so they get same opacity
function fixRepeats(objArray) {
  if(objArray.length==0) return false;
  var newArray = [[onlyKey(objArray[0])]];
  var prevVal = onlyValue(objArray[0]);
  for (var i = 1; i < objArray.length; i++) {
    var obj = objArray[i];
    if (onlyValue(obj) == prevVal) {
      newArray.last().push(onlyKey(obj))
    }else{
      newArray.push([onlyKey(obj)]);
    }
    prevVal = onlyValue(obj);
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
      $('.' + char).css('opacity', 1 / (i + 1) +0.1);
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
function onlyKey(obj) {
  return Object.keys(obj)[0]
};

function onlyValue(obj) {
  return obj[onlyKey(obj)]
}

Array.prototype.last = function () {
  return this[this.length-1]
}

String.prototype.last = function () {
  return this[this.length-1]
}
