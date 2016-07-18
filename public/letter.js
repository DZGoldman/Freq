'use strict'


angular.module('input')
.directive('singleChar', function () {
  return {
    restrict: 'AE',
    replace: 'true',
    template: '<span class={{letter.toLowerCase()}}>{{letter}}<span>',
    link: function (scope, elem, attr) {
      scope.letter =  String.fromCharCode(attr.ascii);
    }
  }
})
