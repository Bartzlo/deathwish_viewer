const Mustache = require('mustache');

function createCoreModule() {
  let coreObjectItems = [];
  let coreElemTmpl = document.getElementById('core').innerHTML;
  let xhrBooks = new XMLHttpRequest();
  let booksUrl = 'img/books/'
  xhrBooks.open('GET', booksUrl + 'config.json', true);

  xhrBooks.addEventListener('load', e => {
    let config;

    try {
      config = JSON.parse(e.target.responseText);
    }
    catch (err) {
      console.error('Error in file ' + e.target.responseURL + "\n" + err.stack);
    }

    config.forEach(book => {
      book.srcBookPreviwe = booksUrl + book.bookName + '/book-previwe.jpg';
      book.altBookPreviwe = book.bookName + ' previwe';

      book.issues.forEach(issue => {
        issue.srcIssuePreviwe = booksUrl + book.bookName + '/' + issue.issueName + '/issue-previwe.jpg';
        issue.altIssuePreviwe = issue.issueName + ' previwe';
      });
    });

    let coreElemRender = Mustache.render(coreElemTmpl, {coreItems: config});

    let event = new CustomEvent('booksModuleIsCreated', {
      detail: {coreElemRender}
    });
    document.dispatchEvent(event);
  });

  xhrBooks.addEventListener('error', e => {
    console.error('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack);
  });

  xhrBooks.send();
}

module.exports.create = createCoreModule;
