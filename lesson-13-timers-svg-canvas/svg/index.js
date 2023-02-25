'use strict';
const baseRadius = 300; //радиус циферблата
const numbersBaseRadius = baseRadius / 2.5; //радиус оси цифр циферблата
const circleRadius = 23; // радиус кружков с цифрами
const dotSize = 4; //размер точки в центре часов
const wrapper = document.getElementById('wrapper');

wrapper.appendChild(createWatch());
setInterval(tickTimer, 1000);

// UI

function createWatch() {
  let base = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  base.setAttribute('width', baseRadius);
  base.setAttribute('height', baseRadius);
  let clock = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
  clock.setAttribute('cx', baseRadius / 2);
  clock.setAttribute('cy', baseRadius / 2);
  clock.setAttribute('r', baseRadius / 2);
  clock.setAttribute('fill', 'yellowgreen');
  base.appendChild(clock);
  base.appendChild(createClockFace());
  base.appendChild(createArrow('hours', 6, 90));
  base.appendChild(createArrow('minutes', 4, 70));
  base.appendChild(createArrow('seconds', 2, 100));
  base.appendChild(createDigitalWatch());
  base.appendChild(createDecorativeDot(dotSize));
  return base;
}

function createClockFace() {
  let clockFace = document.createDocumentFragment();
  for (let number = 1; number <= 12; number++) {
    let angle = number * 30 / 180 * Math.PI;
    let x = ((baseRadius) / 2) + Math.round(Math.sin(angle) * numbersBaseRadius);
    let y = ((baseRadius) / 2) - Math.round(Math.cos(angle) * numbersBaseRadius);
    clockFace.appendChild(createHourCircle(x, y, circleRadius));
    clockFace.appendChild(createHourNumbers(x, y, number));
  }
  return clockFace;
}

function createHourCircle(circleX, circleY, circleRadius) {
  let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('className', 'number');
  circle.setAttribute('cx', circleX);
  circle.setAttribute('cy', circleY);
  circle.setAttribute('r', circleRadius);
  circle.setAttribute('fill', 'orange');
  return circle;
}

function createHourNumbers(circleX, circleY, number) {
  let hourNumber = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  hourNumber.setAttribute('x', circleX);
  hourNumber.setAttribute('y', circleY);
  hourNumber.setAttribute('text-anchor', 'middle');
  hourNumber.setAttribute('dominant-baseline', 'mathematical');
  hourNumber.setAttribute('font-size', '22');
  hourNumber.textContent = number;
  return hourNumber;
}

function createDigitalWatch() {
  let textClock = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textClock.setAttribute('id', 'textClock');
  textClock.setAttribute('x', baseRadius / 2.5);
  textClock.setAttribute('y', baseRadius / 3);
  textClock.setAttribute('font-size', '20');
  return textClock;
}

function createArrow(arrowType, arrowWidth, lineEnd) {
  let arrow = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  let lineStart = baseRadius / 2;
  arrow.setAttribute('id', arrowType);
  arrow.setAttribute('x1', lineStart);
  arrow.setAttribute('y1', lineStart);
  arrow.setAttribute('x2', lineEnd);
  arrow.setAttribute('y2', lineEnd);
  arrow.setAttribute('stroke', 'black');
  arrow.setAttribute('stroke-width', arrowWidth);
  arrow.setAttribute('transform-origin', `${ lineStart }`)
  return arrow;
}

function createDecorativeDot(size) {
  let dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  dot.setAttribute('cx', baseRadius / 2);
  dot.setAttribute('cy', baseRadius / 2);
  dot.setAttribute('r', size);
  dot.setAttribute('fill', 'black');
  return dot;
}

// Logic

function tickTimer() {
  let now = new Date();
  let thisSecond = now.getSeconds();
  let thisMinute = now.getMinutes();
  let thisHour = now.getHours();
  updateWatch(thisHour, thisMinute, thisSecond);
  updateDigitalWatch(thisHour, thisMinute, thisSecond);
}

function updateWatch(hour, minute, second) {
  let thisSecondRotate = (second / 60) * 360 + 45;
  let thisMinuteRotate = (minute) / 60 * 360 + 45;
  let thisHourRotate = (hour + minute / 60) / 12 * 360 + 45;
  rotateHandle('seconds', thisSecondRotate);
  rotateHandle('minutes', thisMinuteRotate);
  rotateHandle('hours', thisHourRotate);
}

function rotateHandle(handle, degree) {
  let arrow = document.getElementById(`${handle}`);
  arrow.setAttribute('transform', `rotate(${degree})`);
}

function updateDigitalWatch(hour, minute, second) {
  let digitalWatch = document.getElementById('textClock');
  digitalWatch.textContent = `${ addZeroToNumber(hour) }:${ addZeroToNumber(minute) }:${ addZeroToNumber(second) }`;
}

function addZeroToNumber(currentTime) {
  return (`${currentTime}`.length < 2) ? (`0${currentTime}`) : currentTime;
}
