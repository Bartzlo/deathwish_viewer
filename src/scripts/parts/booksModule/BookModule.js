const Mustache = require('mustache');

class BookModule {
  constructor(bookConfig) {
    this.bookConfig = bookConfig;
    this.bookElem;
    this._tmpl = document.getElementById('core').innerHTML;
    this._complitEvent = new Event('loadBookModule');
  }

  getElement() {
    if (this.bookElem) {
      document.dispatchEvent(this._complitEvent);
    } else {
      this._loadBookModule();
    }
  }

  _loadBookModule() {
    let imgUrls = this.bookConfig.issues.map((item) => this._loadImg(item.srcIssuePreviwe));
    imgUrls.push(this._loadImg(this.bookConfig.srcBookPreviwe));

    Promise.all(imgUrls)
    .then(() => {
      let elem = document.createElement('div');
      elem.className = 'books-module';

      let render = Mustache.render(this._tmpl, this.bookConfig);
      elem.innerHTML = render;
      this.bookElem = elem;

      document.dispatchEvent(this._complitEvent);
    })
    .catch(function(err) {
      console.log(err.stack);
    });
}

  _loadImg(url){
    return new Promise((resolve, reject) => {
      let img = document.createElement('img');
      img.src = url;

      img.addEventListener('load', e => {
        resolve();
      });

      img.addEventListener('error', e => {
        reject(e);
      });
    });
  }
}

module.exports = BookModule;
