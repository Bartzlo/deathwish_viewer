class BookConfig {
  constructor(configUrl, configName) {
    this.url = configUrl;
    this.configName = configName;
    this.config;
  }

  getConfig() {
    if (this.config) {
      return Promise.resolve(this.config);
    } else {
      return this._requestConfig();
    }
  }

  _requestConfig() {
    return new Promise((resolve, reject) => {
      let xhrBooks = new XMLHttpRequest();

      xhrBooks.open('GET', this.url + this.configName, true);

      xhrBooks.addEventListener('load', event => {
        if (xhrBooks.status != 200) reject(new Error('Config load error: ' + xhrBooks.status));

        try {
          this.config = JSON.parse(xhrBooks.responseText);

          this.config.forEach(book => {
            book.srcBookPreviwe = this.url + book.bookName + '/book-previwe.jpg';
            book.altBookPreviwe = book.bookName + ' previwe';

            book.issues.forEach(issue => {
              issue.srcIssuePreviwe = this.url + book.bookName + '/' + issue.issueName + '/issue-previwe.jpg';
              issue.altIssuePreviwe = issue.issueName + ' previwe';
            });
          });

          resolve(this.config);
        }
        catch (err) {
          reject(err);
        }
      });

      xhrBooks.addEventListener('error', event => {
        reject(event);
      });

      xhrBooks.send();
    })
  }
}

module.exports = BookConfig;
