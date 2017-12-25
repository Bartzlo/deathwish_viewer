// Create all pages

import MainPageStruct from '../blocks/page-main-struct/page-main-struct'
import Content from '../blocks/content/content'
import SideBar from '../blocks/side-bar/side-bar'
import insert from './moduleWorker.js'

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
function buildPageMainStruct () {
  return Promise.resolve()
    .then(() => {
      clearScreenContainer()
      screenContainer.dataset.struct = 'main-page-struct'
      return screenContainer
    })
    .then(elem => {
      return insert({
        block: new MainPageStruct(),
        position: 'inside',
        target: screenContainer
      })
    })
    .catch((error) => console.error(error))
}

// prevUrl - prevents created url (if builder-fuction will be called from getScreen())
builder.buildPage1 = function (prevUrl) {
  if (!prevUrl) setUrl('buildPage1', arguments)
  if (window.stop) window.stop()

  Promise.resolve()
    .then(() => {
      if (screenContainer.dataset.struct === 'main-page-struct') {
        clearSlots()
      } else {
        return buildPageMainStruct()
      }
    })
    .then(() => {
      screenContainer.dataset.screen = 'page1'
      document.title = 'Page 1'
    })
    .then(() => {
      return insert({
        block: new SideBar(),
        position: 'inside',
        target: document.getElementById('side-bar-slot'),
        query: 'data/page1_side_bar.json',
        options: {className: 'side-bar_left'}
      })
    })
    .then(() => {
      return insert({
        block: new Content(),
        position: 'inside',
        target: document.getElementById('main-content-slot'),
        query: 'data/page1_content.json'
      })
    })
    .catch(error => console.error(error))
}

export default builder
