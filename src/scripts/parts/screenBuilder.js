const moduleWorker = require('./moduleWorker.js')
const DataController = require('./dataController.js')

let body = document.body
let bookDbController = new DataController('./data/books.json')
let bookDb

function buildScreen (url) {
  bookDbController.loadBase()
    .then(db => {
    // if (url == 'mainScreen') ...
      bookDb = db
      buildMainScreen()
    })
    .catch(rej => console.error(rej))
}

function buildMainScreen () {
  let content = body.querySelector('.content')
  if (content && content.classList.contains('main-screen')) return
  if (content && !content.classList.contains('main-screen')) content.remove()
  window.stop()

  moduleWorker.insert(
    body,
    'main-screen',
    {},
    {query: false, preload: false}
  )
    .then(res => {
      let books = bookDb.length;

      (function createModule (counter) {
        if (counter >= books) return
        moduleWorker.insert(
          document.querySelector('.book-sliders-container'),
          'book-slider',
          bookDb[counter],
          {query: false, preload: true}
        )
          .then(res => createModule(counter += 1))
      })(0)
    })
    .catch(rej => console.error(rej))
}

function buildPartsViewer (bookName, issueName) {
  let content = body.querySelector('.content')
  if (content) content.remove()
  window.stop()

  moduleWorker.insert(
    body,
    'parts-viewer-screen',
    bookDbController.getMinParts(bookName, issueName),
    {query: false, preload: false}
  )
    .catch(rej => console.error(rej))
}

function buildMainVeiwer (bookName, issueName, number) {
  let content = body.querySelector('.content')
  if (content) content.remove()
  window.stop()

  moduleWorker.insert(
    body,
    'main-veiwer',
    bookDbController.getPart(bookName, issueName, number),
    {query: false, preload: true}
  )
    .then(res => {
      moduleWorker.insert(
        document.querySelector('.main-viewer__container'),
        'main-veiwer__set',
        bookDbController.getPartsSet(bookName, issueName),
        {query: false, preload: false}
      )
    })
    .catch(rej => console.error(rej))
}

module.exports = {
  'buildScreen': buildScreen,
  'buildPartsViewer': buildPartsViewer,
  'buildMainScreen': buildMainScreen,
  'buildMainVeiwer': buildMainVeiwer
}
