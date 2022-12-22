'use strict';

var div = document.createElement('div');
var img1 = document.createElement('img');
var img2 = document.createElement('img');
var img3 = document.createElement('img');
document.body.appendChild(div);
div.appendChild(img1); div.appendChild(img2); div.appendChild(img3);
div.style.border = 'solid gray 1px';
img1.setAttribute('src', '1.jpg'); img2.setAttribute('src', '2.jpg'); img3.setAttribute('src', '3.jpg');
img1.setAttribute('class', 'img');
img2.setAttribute('class', 'img');
img3.setAttribute('class', 'img');

var DragShiftX;
var DragShiftY;

var images = document.getElementsByClassName('img');
for (var e = images.length - 1; e >=0; e--) {
  var imgLeft = images[e].getBoundingClientRect().left + window.pageXOffset;
  console.log(imgLeft);
  var imgTop = images[e].getBoundingClientRect().top + window.pageYOffset;
  console.log(imgTop);
  images[e].style.position = 'absolute';
  images[e].style.left = imgLeft + 'px';
  images[e].style.top = imgTop + 'px';
  images[e].addEventListener('mousedown', mouseDown, false);
  images[e].style.cursor = 'move';
};
function mouseDown(event) {
  var EO = event || window.event;
  EO.preventDefault();

  var target = EO.target;
  var mouseX = EO.pageX; // координаты мышки
  var mouseY = EO.pageY;

  DragShiftX = mouseX - target.offsetLeft; // мышиные координаты - оффсеты
  DragShiftY = mouseY - target.offsetTop; // разница между положением курсора мыши и положением картинки (д. б. постоянной)

  window.addEventListener('mousemove', mouseMove);
  window.addEventListener('mouseup', mouseUp);
}
function mouseMove(event) {
  var EO = event || window.event;
  EO.preventDefault();

  var target = EO.target;
  target.style.zIndex = '100';
  target.style.left = EO.pageX - DragShiftX + 'px';
  target.style.top = EO.pageY - DragShiftY + 'px';
}
function mouseUp(event) {
  var EO = event || window.event;
  EO.preventDefault();
  var target = EO.target;
  target.style.zIndex = '1';
  EO.preventDefault();
  window.removeEventListener('mousemove', mouseMove);
  window.removeEventListener('mouseup', mouseUp);
}