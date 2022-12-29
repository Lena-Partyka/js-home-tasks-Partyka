'use strict';

function isPalidrom(string) {
  var arr = string ? string.split(' ').join('').toLowerCase().split('') : [];
  var arrReversed = arr.slice().reverse();
  return arr.join('') === arrReversed.join('');
}

console.log(isPalidrom('Anna'));
console.log(isPalidrom('А роза упала на лапу Азора'));
console.log(isPalidrom('Вася'));
console.log(isPalidrom('12321'));
console.log(isPalidrom('123212'));