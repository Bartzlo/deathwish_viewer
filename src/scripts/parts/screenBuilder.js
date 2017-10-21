const booksModuleSliderController = require('./booksModule/sliderController.js');
const BookModuleConfig = require('./booksModule/BookConfig.js');
const BookModule = require('./booksModule/BookModule.js');

let mainScreen = document.createElement('div');
mainScreen.setAttribute('data-render', '');

let container = document.createElement('section');
document.getElementsByTagName('main')[0].appendChild(container);

function createMainScreen() {
  console.log('createMainScreen()');
  if (mainScreen.dataset.render == 'inload') {
    return;
  }

  container.className = 'books-module-container';
  container.innerHTML = '';
  container.appendChild(mainScreen);

  if (mainScreen.dataset.render == 'complite') {
    return;
  }

  booksModuleSliderController.init();
  mainScreen.dataset.render = 'inload';

  let bookModuleConfig = new BookModuleConfig('img/books/', 'config.json');
  bookModuleConfig.getConfig()
    .then(function(config) {
      mainScreen.innerHTML = '';
      displayAllBookModules(config);
    })
    .catch(function(err) {
      console.log(err.stack);
    });
}

function displayAllBookModules(config) {
  let moduleData = config.shift();
  if (!moduleData){
    console.log('module is full loaded');
    mainScreen.dataset.render = 'complite';
    return;
  }

  let bookModule = new BookModule(moduleData);
  bookModule.getElement()
    .then(() => {
      mainScreen.appendChild(bookModule.bookElem);
      displayAllBookModules(config);
    })
    .catch((err) => {
      console.log(err.stack);
    })
}

module.exports.createMainScreen = createMainScreen;
