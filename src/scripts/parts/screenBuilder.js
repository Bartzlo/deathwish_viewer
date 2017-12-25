// Create all pages

const moduleWorker = require('./moduleWorker.js')

let error404 = require('../../blocks/error-404/error-404')

const screenContainer = document.getElementById('root')

// Object with builders-functions, to access by using string name
let builder = {}

// Generate url from function name and arguments
function setUrl (funcName, args) {
  args = args[0] ? [].slice.call(args[0]).join('&') : null
  let url = '#' + funcName + (args ? '&' + args : '')
  history.pushState({path: url}, '', url)
}

// Get page from url 'funcName&arg1&arg2&...' for screen build
builder.getScreen = function (url) {
  url = url.replace(new RegExp('%20', 'g'), ' ')
  let params = url.split('&')

  try {
    builder[params[0]](params.slice(1), 'prevUrl')
  } catch (err) {
    builder.buildMainScreen()
    console.error('Wrong function name: ' + params[0])
    console.error(err.stack)
  }
}

function clearScreenContainer () {
  screenContainer.dataset.struct = ''
  screenContainer.dataset.screen = ''
  screenContainer.innerHTML = ''
}

function clearSlots () {
  document.querySelectorAll('.slot').forEach(item => {
    item.innerHTML = ''
  })
}

// Build static content for index page
function buildMainScreenSet () {
  return Promise.resolve()
    .then(() => {
      clearScreenContainer()
      screenContainer.dataset.struct = 'main-screen-set'
      return screenContainer
    })
    .then(elem => {
      return moduleWorker.insert({
        block: mainScreenSet.get(),
        position: 'inside',
        target: screenContainer
      })
    })
    .catch((error) => console.error(error))
}

// prevUrl - prevents created url (if builder-fuction will be called from getScreen())
builder.buildMainScreen = function (prevUrl) {
  if (!prevUrl) setUrl('buildMainScreen', arguments)
  if (window.stop) window.stop()

  Promise.resolve()
    .then(() => {
      if (screenContainer.dataset.struct === 'main-screen-set') {
        clearSlots()
      } else {
        return buildMainScreenSet()
      }
    })
    .then(() => {
      screenContainer.dataset.screen = 'main-screen'
      document.title = 'Main page'
    })
    .then(() => {
      return moduleWorker.insert({
        block: simpleText.get(),
        position: 'inside',
        target: document.getElementById('main-content'),
        query: 'data/text.json'
      })
    })
    .catch(error => console.error(error))
}

builder.buildError404 = function (prevUrl) {
  if (window.stop) window.stop()

  Promise.resolve()
    .then(() => {
      clearScreenContainer()
      screenContainer.dataset.screen = 'error-404'

      return moduleWorker.insert({
        block: error404.get(),
        position: 'inside',
        target: screenContainer
      })
    })
    .catch((err) => console.error(err))
}

module.exports = {
  'builder': builder
}
