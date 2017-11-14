let mainScreen = require('../../blocks/main-screen/main-screen.js')
let bookSlider = require('../../blocks/book-sliders-container/book-slider/book-slider.js')
let partsVeiwerScreen = require('../../blocks/parts-viewer-screen/parts-viewer-screen.js')
let mainVeiwerScreen = require('../../blocks/main-veiwer-screen/main-veiwer-screen.js')
let mainVeiwer = require('../../blocks/main-veiwer/main-veiwer.js')
let mainVeiwerSet = require('../../blocks/main-veiwer/main-veiwer__set/main-veiwer__set.js')

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
    builder[params[0]](params.slice(1))
  } catch (err) {
    if (err.message.includes('is not a function')) {
      builder.buildMainScreen()
      console.error('Wrong url: ' + url)
    } else {
      console.error(err.stack)
    }
  }
}

builder.buildMainScreen = function ([prevUrl]) {
  if (!prevUrl) setUrl('buildMainScreen', arguments)
  let content = body.querySelector('.content')
  if (content && content.classList.contains('main-screen')) return
  if (content && !content.classList.contains('main-screen')) content.remove()
  window.stop()

  Promise.resolve()
    .then(() => {
      moduleWorker.insert({
        block: mainScreen,
        position: 'inside',
        target: body
      })
    })
    .then(() => {
      let books = bookDbController.getBooksCounter();

      (function createModule (counter) {
        if (counter >= books) return

        moduleWorker.insert({
          block: bookSlider,
          position: 'inside',
          target: document.querySelector('.book-sliders-container'),
          data: bookDbController.getBook(counter),
          preload: true
        })
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

  Promise.resolve()
    .then(() => {
      moduleWorker.insert({
        block: partsVeiwerScreen,
        position: 'inside',
        target: body,
        data: bookDbController.getMinParts(bookName, issueName)
      })
    })
    .catch(rej => console.error(rej))
}

builder.buildMainVeiwer = function ([bookName, issueName, number, prevUrl]) {
  if (!prevUrl) setUrl('buildMainVeiwer', arguments)
  let content = body.querySelector('.content')
  if (content) content.remove()
  window.stop()

  Promise.resolve()
    .then(() => {
      moduleWorker.insert({
        block: mainVeiwerScreen,
        position: 'inside',
        target: body
      })
    })
    .then(res => {
      return moduleWorker.insert({
        block: mainVeiwer,
        position: 'inside',
        target: document.querySelector('.main-viewer-container'),
        data: bookDbController.getPart(bookName, issueName, number),
        preload: true
      })
    })
    .then(res => {
      moduleWorker.insert({
        block: mainVeiwerSet,
        position: 'inside',
        target: document.querySelector('.main-viewer__imgs-area'),
        data: bookDbController.getPartsSet(bookName, issueName)
      })
    })
    .catch(rej => console.error(rej))
}

module.exports = {
  'setDbController': setDbController,
  'builder': builder
}
