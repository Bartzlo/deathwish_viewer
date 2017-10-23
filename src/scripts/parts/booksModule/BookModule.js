const Mustache = require('mustache');

class BookModule {
  constructor(bookConfig) {
    this.bookConfig = bookConfig;
    this._tmpl = document.getElementById('core').innerHTML;
    this.bookElem = this._renderModule();
    this._complitEvent = new Event('loadBookModule');
  }

  getElement() {
    return this.bookElem;
  }

  isComplitLoad() {
    return this._loadBookModule();
  }

  _renderModule() {
    let elem = document.createElement('div');
    elem.className = 'books-module';

    let render = Mustache.render(this._tmpl, this.bookConfig);
    elem.innerHTML = render;
    this.bookElem = elem;

    return elem;
  }

  _loadBookModule() {
    return new Promise((resolve, reject) => {

      let imgUrls = this.bookConfig.issues.map((item) => this._preLoadImg(item.srcIssuePreviwe));
      imgUrls.push(this._preLoadImg(this.bookConfig.srcBookPreviwe));

      Promise.all(imgUrls)
      .then(() => {
        resolve('preload complite');
      })
      .catch(function(err) {
        console.log(err.stack);
      });
    });
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
