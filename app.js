var $input = $('#input');
var $output = $('#output')


$input.bind("input", change)

var oldValue = $input.val();
function change(evt) {
  var text = $input.val();
  var obj = makeObj(text);
  var arr = makeArray(obj);
  arr = fixRepeats(arr);
  var newValue = text.slice(0, text.length - 1);
  if (oldValue == newValue) {
    spanifyAdd(text.last(), $output);
  } else {
    spanifyReset(text, $output);
  }
  colorize(arr);
  oldValue = text;
};

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

function spanifyReset(text, $target) {
  $target.empty();
  for (var i = 0; i < text.length; i++) {
    var currentChar = text[i];
    var $spanTag = $('<span>');
    $spanTag.text(currentChar);
    //give right class
    var newClass = currentChar.toLowerCase();
    var ascii = newClass.charCodeAt(0);
    if (ascii >= 97 && ascii <= 122) {
      $spanTag.attr('class', (newClass))
    } else {
      $spanTag.attr('class', 'other')
    };
    $target.append($spanTag);
  }
};

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

Object.prototype.onlyKey = function() {
  return Object.keys(this)[0]
};

Object.prototype.onlyValue = function() {
  return this[this.onlyKey()]
}

Array.prototype.last = function () {
  return this[this.length-1]
}

String.prototype.last = function () {
  return this[this.length-1]
}
