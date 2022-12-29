'use strict';

function anClean(arr) {
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    var sorted = arr[i].toLowerCase().split('').sort().join('');
    obj[sorted] = arr[i];
  }
  var result = [];
  for (var key in obj) {
    result.push(obj[key]);
  }
  return result;
}

console.log(anClean(['воз', 'киборг', 'корсет', 'ЗОВ', 'гробик', 'костер', 'сектор']));