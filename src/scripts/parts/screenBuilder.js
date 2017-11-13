const moduleWorker = require('./moduleWorker.js')

let body = document.body
let bookDbController
let builder = {}

function setDbController (dbController) {
  bookDbController = dbController
}

function setUrl (funcName, args) {
  args = args[0] ? [].slice.call(args[0]).join('&') : null
  let url = '#' + funcName + (args ? '&' + args : '')
  // window.location.hash = url
  history.pushState({path: url}, '', url)
}

builder.getScreen = function (url) { // 'funcName&arg1&arg2&...'
  let params = url.split('&')
  params.push('prevUrl')

  // если вызов билдеров идет из этой функции, не нужно вызывать setUrl
  try {
    this[params[0]](params.slice(1))
  } catch (err) {
    if (err.message.includes('is not a function')) {
      builder.buildMainScreen()
      console.log('Wrong url: ' + url)
    } else {
      console.log(err.message)
    }
  }
}

builder.buildMainScreen = function ([prevUrl]) {
  if (!prevUrl) setUrl('buildMainScreen', arguments)
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
      let books = bookDbController.getBooksCounter();

      (function createModule (counter) {
        if (counter >= books) return
        moduleWorker.insert(
          document.querySelector('.book-sliders-container'),
          'book-slider',
          bookDbController.getBook(counter),
          {query: false, preload: true}
        )
          .then(res => createModule(counter += 1))
      })(0)
    })
    .catch(rej => console.error(rej))
}

builder.buildPartsViewer = function ([bookName, issueName, prevUrl]) {
  if (!prevUrl) setUrl('buildPartsViewer', arguments)
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

builder.buildMainVeiwer = function ([bookName, issueName, number, prevUrl]) {
  if (!prevUrl) setUrl('buildMainVeiwer', arguments)
  let content = body.querySelector('.content')
  if (content) content.remove()
  window.stop()

  moduleWorker.insert(
    body,
    'main-veiwer-screen',
    {},
    {query: false, preload: false}
  )
    .then(res => {
      return moduleWorker.insert(
        document.querySelector('.main-viewer-container'),
        'main-veiwer',
        bookDbController.getPart(bookName, issueName, number),
        {query: false, preload: true}
      )
    })
    .then(res => {
      moduleWorker.insert(
        document.querySelector('.main-viewer__imgs-area'),
        'main-veiwer__set',
        bookDbController.getPartsSet(bookName, issueName),
        {query: false, preload: false}
      )
    })
    .catch(rej => console.error(rej))
}

module.exports = {
  'setDbController': setDbController,
  'builder': builder
}
