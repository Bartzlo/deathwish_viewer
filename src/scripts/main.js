'use strict';
console.log('start main script');

//const booksModuleConstructor = require('./parts/booksModule/constructor.js');
const booksModuleSliderController = require('./parts/booksModule/sliderController.js');
const BookModuleConfig = require('./parts/booksModule/BookConfig.js');
const BookModule = require('./parts/booksModule/BookModule.js');
//********************************//

let container = document.createElement('section');
document.getElementsByTagName('main')[0].appendChild(container);

createMainScreen()

function createMainScreen() {
  booksModuleSliderController.init();
  container.className = 'books-module-container';

  let bookModuleConfig = new BookModuleConfig('img/books/', 'config.json');
  bookModuleConfig.getConfig()
    .then(function (config) {
      config.forEach(item => {
        let bookModule = new BookModule(item);
        container.appendChild(bookModule.getElement());
      });
    })
    .catch(function (err) {
      console.log(err.stack);
    });
}
