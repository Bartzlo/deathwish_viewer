'use strict';
console.log('start main script');

const Mustache = require('mustache');
//********************************//

let coreObjectItems = [];
let xhrBooks = new XMLHttpRequest();
xhrBooks.open('GET', 'img/books/books.json', true);

xhrBooks.addEventListener('load', e => {
  try {
    let books = JSON.parse(e.target.responseText);
    books.forEach((bookName, i) => {
      coreObjectItems[i] = {};
      coreObjectItems[i].srcBookPreviwe = `img/books/${bookName}/book-previwe.jpg`;
      coreObjectItems[i].altBookPreviwe = `${bookName} previwe`;
      coreObjectItems[i].bookTitle = bookName;

      let xhrParts = new XMLHttpRequest();
      xhrParts.open('GET', `img/books/${bookName}/parts.json`, true);
      xhrParts.bookNumber = i;
      xhrParts.bookName = bookName;

      xhrParts.addEventListener('load', e => {
        try {
          let parts = JSON.parse(e.target.responseText);
          let bookNumber = e.target.bookNumber;
          let bookName = e.target.bookName;
          coreObjectItems[bookNumber].bookModuleItem = [];

          parts.forEach((partName, i) => {
            coreObjectItems[bookNumber].bookModuleItem[i] = {};
            coreObjectItems[bookNumber].bookModuleItem[i].srcPartPreviwe = `img/books/${bookName}/${partName}/issue-previwe.jpg`;
            coreObjectItems[bookNumber].bookModuleItem[i].altPartPreviwe = `${partName} previwe`;
            coreObjectItems[bookNumber].bookModuleItem[i].partTitle = partName;
          });


        }
        catch (err) {
          console.error('Error in file ' + e.target.responseURL + "\n" + err.stack);
        }


      });

      xhrParts.addEventListener('error', e => {
        console.error('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack);
      });

      xhrParts.send();
    });
  }
  catch (err) {
    console.error('Error in file ' + e.target.responseURL + "\n" + err.stack);
  }
});

xhrBooks.addEventListener('error', e => {
  console.error('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack);
});

xhrBooks.send();


let core = document.getElementById('core').innerHTML;
Mustache.parse(core);

// coreObjectItems empty, becouse asyncs
let render = Mustache.render(core, {coreItems: coreObjectItems});
document.querySelector('.core').innerHTML = render;
