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

  if (mainScreen.dataset.render == 'complite') {
    console.log('Reused!');
    container.appendChild(mainScreen);
    return;
  }

  booksModuleSliderController.init();

  let bookModuleConfig = new BookModuleConfig('img/books/', 'config.json');
  bookModuleConfig.getConfig()
    .then(function (config) {
      mainScreen.innerHTML = '';
      config.forEach(item => {
        let bookModule = new BookModule(item);
        mainScreen.appendChild(bookModule.getElement());
      });
      mainScreen.dataset.render = 'complite';
      container.appendChild(mainScreen);
    })
    .catch(function (err) {
      console.log(err.stack);
    });
}

module.exports.createMainScreen = createMainScreen;
