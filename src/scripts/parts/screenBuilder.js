const moduleWorker = require('./moduleWorker.js')
const DataController = require('./dataController.js')

let content = document.getElementById('content')
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
  content.innerHTML = ''

  moduleWorker.insert(
    content,
    'main-screen',
    {},
    {query: false, preload: false}
  )
    .then(res => {
      bookDb.forEach((book) => {
        moduleWorker.insert(
          document.querySelector('.book-sliders-container'),
          'book-slider',
          book,
          {query: false, preload: true}
        )
      })
    })
    .catch(rej => console.error(rej))
}

module.exports.buildScreen = buildScreen
