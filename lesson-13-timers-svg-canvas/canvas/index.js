'use strict';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var baseRadius = canvas.height / 2; //радиус циферблата
ctx.translate(baseRadius, baseRadius);

setInterval(createWatch, 1000);

function createWatch() {
  createClockFace(ctx, baseRadius);
  createDecorativeDot(ctx, baseRadius);
  createHourCircle(ctx, baseRadius);
  createNumbers(ctx, baseRadius);
  tickTimer();
}

function createClockFace() {
  ctx.beginPath();
  ctx.arc(0, 0, baseRadius, 0, 2 * Math.PI);
  ctx.fillStyle = 'yellowgreen';
  ctx.fill();
}

function createDecorativeDot() {
  ctx.beginPath();
  ctx.arc(0, 0, baseRadius * 0.05, 0, 2 * Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();
}

function createHourCircle() {
  for (var number = 1; number <= 12; number++) {
    var angle = number * 30 / 180 * Math.PI;
    ctx.rotate(angle);
    ctx.translate(0, -baseRadius * 0.8);
    ctx.rotate(-angle);
    ctx.beginPath();
    ctx.arc(0, 0, baseRadius * 0.15, 0, 2 * Math.PI);
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.rotate(angle);
    ctx.translate(0, baseRadius * 0.8);
    ctx.rotate(-angle);
  }
}

function createNumbers() {
  ctx.font = baseRadius * 0.15 + 'px arial';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';
  for (var number = 1; number <= 12; number++){
    var angle = number * 30 / 180 * Math.PI;
    ctx.rotate(angle);
    ctx.translate(0, - baseRadius * 0.80);
    ctx.rotate (- angle);
    ctx.fillText(number.toString(), 0, 0);
    ctx.rotate(angle);
    ctx.translate(0, baseRadius * 0.80);
    ctx.rotate(- angle);
  }
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

function drawTime(hour, minute, second) {
  var thisHour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
  var thisMinute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
  var thisSecond = (second * Math.PI / 30);

  drawHand(ctx, thisHour, baseRadius * 0.5, baseRadius * 0.07);
  drawHand(ctx, thisMinute, baseRadius * 0.7, baseRadius * 0.03);
  drawHand(ctx, thisSecond, baseRadius * 0.8, baseRadius * 0.02);
}

function createDigitalWatch(ctx, baseRadius, hour, minute, second) {
  ctx.fillStyle = 'black';
  ctx.font = baseRadius * 0.15 + 'px arial';
  ctx.textAlign = 'center';
  ctx.fillText(`${ addZeroToNumber(hour) }:${ addZeroToNumber(minute) }:${ addZeroToNumber(second) }`, 0, -baseRadius / 2);
}

function tickTimer() {
  var currentTime = new Date();
  var thisHour = currentTime.getHours();
  var thisMinute = currentTime.getMinutes();
  var thisSecond = currentTime.getSeconds();
  drawTime(thisHour, thisMinute, thisSecond);
  createDigitalWatch(ctx, baseRadius, thisHour, thisMinute, thisSecond);
}

function addZeroToNumber(currentTime) {
  return (`${currentTime}`.length < 2) ? (`0${currentTime}`) : currentTime;
}