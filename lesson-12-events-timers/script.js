'use strict';

var wrapper = document.getElementById('wrapper');
// это будет центр часов
var wrapCenterX;
wrapCenterX = wrapper.offsetLeft + wrapper.offsetWidth / 2;
var wrapCenterY;
wrapCenterY = wrapper.offsetTop + wrapper.offsetHeight / 2;
var smartClock;
smartClock = document.createElement('div');
var arrowHours = document.createElement('div');
var arrowMinutes = document.createElement('div');
var arrowSeconds = document.createElement('div');
var radius = 120; // радиус циферблата
var radiusSmartClock = 70;
var angle = 0;
var stepAngle = 30;
var hour = 12;
var time = new Date;
var hoursDeg = 30 * (time.getHours() + (1 / 60) * time.getMinutes());
var minutesDeg = 6 * (time.getMinutes() + (1 / 60) * time.getSeconds());
var secondsDeg = 6 * time.getSeconds() - 6;

function pos() {
  for (var i = 1; i<= hour; i++) {
    var circleWithNum = document.createElement('div');
    var radian;
    var circleWithNumCenterX;
    var circleWithNumCenterY;
    radius = parseFloat(radius);
    angle += stepAngle;
    radian = parseFloat(angle) / 180 * Math.PI;

    circleWithNum = wrapper.appendChild(circleWithNum);
    circleWithNum.setAttribute('id', 'circleWithNum');
    circleWithNum.innerHTML = i;

    circleWithNumCenterX = wrapCenterX + radius * Math.sin(radian);
    circleWithNumCenterY = wrapCenterY - radius * Math.cos(radian);

    circleWithNum.style.left = Math.round(circleWithNumCenterX - circleWithNum.offsetWidth / 2) + 'px';
    circleWithNum.style.top = Math.round(circleWithNumCenterY - circleWithNum.offsetHeight / 2) + 'px';
  }
}
pos();

wrapper.appendChild(smartClock); // электронные часы
wrapper.appendChild(arrowHours); // стрелки
wrapper.appendChild(arrowMinutes);
wrapper.appendChild(arrowSeconds);

smartClock.className = 'smartClock';
arrowHours.className = 'arrowHours';
arrowMinutes.className = 'arrowMinutes';
arrowSeconds.className = 'arrowSeconds';

smartClock.style.left = wrapCenterX - smartClock.offsetWidth/2 + 'px'; // где размещаются электронные часы
smartClock.style.top = wrapCenterY - radiusSmartClock + 'px';

arrowHours.style.top = wrapCenterY - arrowHours.offsetHeight + 10 + 'px';
arrowHours.style.left = wrapCenterX - arrowHours.offsetWidth/2 + 'px';

arrowMinutes.style.top = wrapCenterY - arrowMinutes.offsetHeight + 10 + 'px';
arrowMinutes.style.left = wrapCenterX - arrowMinutes.offsetWidth/2 + 'px';

arrowSeconds.style.top = wrapCenterY - arrowSeconds.offsetHeight+10 + 'px';
arrowSeconds.style.left = wrapCenterX - arrowSeconds.offsetWidth/2 + 'px';

arrowHours.style.transformOrigin = 'center 50px';
arrowMinutes.style.transformOrigin = 'center 110px';
arrowSeconds.style.transformOrigin = 'center 135px';

function arrows() {
  var time = new Date();
  smartClock.innerHTML = time.toLocaleTimeString();
  secondsDeg +=6;
  arrowSeconds.style.transform = "rotate(" + secondsDeg + "deg)";
  minutesDeg += 6 * (1/60);
  arrowMinutes.style.transform = "rotate(" + minutesDeg + "deg)";
  hoursDeg += 6 * (1/360);
  arrowHours.style.transform = "rotate(" + hoursDeg + "deg)";
}

window.onload = arrows();
window.setInterval(arrows, 1000);













