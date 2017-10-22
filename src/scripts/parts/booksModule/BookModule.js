const Mustache = require('mustache');

class BookModule {
  constructor(bookConfig) {
    this.bookConfig = bookConfig;
    this._tmpl = document.getElementById('core').innerHTML;
    this.bookElem = this._renderModule();;
    this._complitEvent = new Event('loadBookModule');
  }

  getElement() {
    return this._loadBookModule();
  }


  _loadBookModule() {
    return new Promise((resolve, reject) => {

      let imgUrls = this.bookConfig.issues.map((item) => this._preLoadImg(item.srcIssuePreviwe));
      imgUrls.push(this._preLoadImg(this.bookConfig.srcBookPreviwe));

      // Блок ниже ожно использовать без promise.all
      // в таком случае модуль будет появляться сразу не дожидаясь
      // загрузки изображений
      // Promise.all написан специально для syncLoadBookModules() скрибилдера
      Promise.all(imgUrls)
      .then(() => {
        resolve('preload complite');
      })
      .catch(function(err) {
        console.log(err.stack);
      });
    });
  }

  _renderModule() {
    let elem = document.createElement('div');
    elem.className = 'books-module';

    let render = Mustache.render(this._tmpl, this.bookConfig);
    elem.innerHTML = render;
    this.bookElem = elem;

    return elem;
  }

  _preLoadImg(url) {
    return new Promise((resolve, reject) => {
      let img = document.createElement('img');
      img.src = url;

      img.addEventListener('load', e => {
        resolve();
      });

      img.addEventListener('error', e => {
        console.log(new Error('Preloading image error. Image file not found. Url: ' + url).stack);
        resolve();
      });
    });
  }
}

module.exports = BookModule;
