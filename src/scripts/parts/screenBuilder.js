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
  let content = body.querySelector('.conrent')
  if (content && content.classList.hasClass('main-screen')) return
  if (content && !content.classList.hasClass('main-screen')) content.remove()

  moduleWorker.insert(
    body,
    'main-screen',
    {},
    {query: false, preload: true}
  )
    .then(res => {
      let books = bookDb.length;

      (function createModule (counter) {
        if (counter >= books) return
        moduleWorker.insert(
          document.querySelector('.book-sliders-container'),
          'book-slider',
          bookDb[counter],
          {query: false, preload: false}
        )
          .then(res => createModule(counter += 1))
      })(0)
    })
    .catch(rej => console.error(rej))
}

module.exports.buildScreen = buildScreen
