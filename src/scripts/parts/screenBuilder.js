const booksModuleSliderController = require('./booksModule/sliderController.js');
const BookModuleConfig = require('./booksModule/BookConfig.js');
const BookModule = require('./booksModule/BookModule.js');

let mainScreen = document.createElement('div');
mainScreen.setAttribute('data-render', 'qwe');

let container = document.createElement('section');
document.getElementsByTagName('main')[0].appendChild(container);

function createMainScreen() {
  container.className = 'books-module-container';
  container.innerHTML = '';
  container.appendChild(mainScreen);

  if (mainScreen.dataset.render == 'complite') {
    return;
  }

  booksModuleSliderController.init();

  let bookModuleConfig = new BookModuleConfig('img/books/', 'config.json');
  bookModuleConfig.getConfig()
    .then(function(config) {
      mainScreen.innerHTML = '';
      displayAllBookModules(config);
    })
    .then(function() {
      console.log('complit all');
      mainScreen.dataset.render = 'complite';
    })
    .catch(function(err) {
      console.log(err.stack);
    });
}

function displayAllBookModules(config) {
  let moduleData = config.shift();
  if (!moduleData) return;

  new Promise((resolve, reject) => {
    let bookModule = new BookModule(moduleData);
    bookModule.getElement();
    document.addEventListener('loadBookModule', e => {
      mainScreen.appendChild(bookModule.bookElem);
      displayAllBookModules(config);
    });
  });
}

module.exports.createMainScreen = createMainScreen;
