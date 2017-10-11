'use strict';
console.log('start main');

function fun() {
  const Animal = require('./Animal.js');

  let animal = new Animal(33);
  animal.getFootsCount();
  animal.cutFoot();
  animal.cutFoot();
  animal.cutFoot();
  animal.cutFoot();
  animal.cutFoot();
  animal.getFootsCount();
}

setTimeout(fun, 5000);
