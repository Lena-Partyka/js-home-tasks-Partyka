'use strict';

var obj = {
  className: 'open menu menu open my'
};

function removeClass(obj, cls) {
  var classes = obj.className ? obj.className.split(' ') : [];
  for (var i = 0; i < classes.length; i++) {
    if (classes[i] === cls) {
      classes.splice(i, 1);
      i--;
    }
  }
  obj.className = classes.join(' ');
}

removeClass(obj, 'menu');
removeClass(obj, 'open');

alert(obj.className);