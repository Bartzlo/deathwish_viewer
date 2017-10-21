const Mustache = require('mustache');

class BookModule {
  constructor(bookConfig) {
    this.bookConfig = bookConfig;
    this.bookElem;
    this._tmpl = document.getElementById('core').innerHTML;
  }

  getElement() {
    if (this.bookElem) {
      return this.bookElem;
    } else {
      this._loadBookModule();
      return this.bookElem;
    }
  }

  _loadBookModule() {
    let elem = document.createElement('div');
    elem.className = 'books-module';

    let render = Mustache.render(this._tmpl, this.bookConfig);
    elem.innerHTML = render;

    this.bookElem = elem;
  }
}

module.exports = BookModule;
