const booksModuleSliderController = require('./booksModule/sliderController.js');
const BookModuleConfig = require('./booksModule/BookConfig.js');
const BookModule = require('./booksModule/BookModule.js');

let mainScreen = document.createElement('div');
mainScreen.setAttribute('data-render', '');

let container = document.createElement('section');
document.getElementsByTagName('main')[0].appendChild(container);

function createMainScreen() {
  // Есть 3 варианта згрузки модулей:
  // - Згрузка все модулей книг без прелоада asyncLoadBookModules()
  // - Загрузка модулей поочереди без прелоада syncLoadBookModules( ,false)
  // - Загрузка модулей поочереди с прелоадом syncLoadBookModules( ,true)

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
      syncLoadBookModules(config, false);
      //asyncLoadBookModules(config);
    })
    .catch(function(err) {
      console.log(err.stack);
    });
}

function syncLoadBookModules(config, preload) {
  let moduleData = config.shift();
  if (!moduleData){
    console.log('module is full loaded');
    mainScreen.dataset.render = 'complite';
    return;
  }

  let bookModule = new BookModule(moduleData);
  // Для показа модуля без предварительной загрузки изображений
  if (!preload)
    mainScreen.appendChild(bookModule.bookElem);

  bookModule.getElement()
    .then(() => {
      syncLoadBookModules(config, preload);
      // Для показа модуля с предварительной загрузки изображений
      if (preload)
        mainScreen.appendChild(bookModule.bookElem);
    })
    .catch((err) => {
      console.log(err.stack);
    })
}

// don't using now
function asyncLoadBookModules(config) {
  config.forEach((moduleData) => {
    let bookModule = new BookModule(moduleData);
    mainScreen.appendChild(bookModule.bookElem);
  });
}

module.exports.createMainScreen = createMainScreen;
