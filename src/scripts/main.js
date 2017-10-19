'use strict';
console.log('start main script');

const booksModuleConstructor = require('./parts/booksModule/constructor.js');
const booksModuleSliderController = require('./parts/booksModule/sliderController.js');
let coreElemRender; // core module for main screen
//********************************//

booksModuleConstructor.create(); // when complite, booksModuleIsCreated will be call
booksModuleSliderController.init();

document.addEventListener('booksModuleIsCreated', e => {
  console.log('books module is ready');
  coreElemRender = e.detail.coreElemRender;
  document.querySelector('.books-module-container').innerHTML = coreElemRender;
});
