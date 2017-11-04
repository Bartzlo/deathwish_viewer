const Mustache = require('mustache')
let mainScreen = require('../../blocks/main-screen/main-screen.js')
let logo = require('../../blocks/logo/logo.js')
let bookSlider = require('../../blocks/book-sliders-container/book-slider/book-slider.js')
let preloader = require('../../blocks/preloader/preloader.js')

let modules = {
  'main-screen': mainScreen,
  'logo': logo,
  'preloader': preloader,
  'book-slider': bookSlider
}

function getElement (moduleName, data = {}) {
  try {
    if (!modules[moduleName]) {
      throw new Error(`Module "${moduleName}" no found`)
    }

    // console.log(modules[moduleName])
    // console.log(data)

    let elem = document.createElement('div')
    elem.innerHTML = Mustache.render(modules[moduleName], data)
    elem = elem.firstElementChild
    return elem
  } catch (error) {
    console.error(error.stack)
    let div = document.createElement('div')
    div.setAttribute('data-render_error', moduleName)
    return div
  }
}

function getPreloadElement (moduleName, data = {}) {
  return new Promise((resolve, reject) => {
    let elem = getElement(moduleName, data)
    let counter = elem.getElementsByTagName('img').length
    if (counter === 0) resolve(elem)

    elem.addEventListener('load', e => {
      counter -= 1
      if (counter === 0) resolve(elem)
    }, true)

    elem.addEventListener('error', e => {
      counter -= 1
      if (counter === 0) resolve(elem)
    }, true)
  })
}

function getRemElement (moduleName, query) {
  let url = `${query}`
  return fetch(url)
    .then(res => res.json())
    .then(res => getElement(moduleName, res))
    .catch(rej => {
      console.error(rej)
      let div = document.createElement('div')
      div.setAttribute('data-render_error', moduleName)
      return div
    })
}

function getRemPreloadElement (moduleName, query) {
  let url = `${query}`
  return fetch(url)
    .then(res => res.json())
    .then(res => getPreloadElement(moduleName, res))
    .catch(rej => {
      console.error(rej)
      let div = document.createElement('div')
      div.setAttribute('data-render_error', moduleName)
      return div
    })
}

function insert (target, moduleName, data = {}, opt = {query: false, preload: false}) {
  return new Promise((resolve, reject) => {
    if (opt.query && opt.preload) {
      let preloader = getElement('preloader')
      target.appendChild(preloader)
      getRemPreloadElement(moduleName, data)
        .then(res => {
          preloader.remove()
          target.appendChild(res)
          resolve(target)
        })
        .catch(rej => reject(rej))
    } else if (opt.query) {
      getRemElement(moduleName, data)
        .then(res => {
          target.appendChild(res)
          resolve(target)
        })
        .catch(rej => reject(rej))
    } else if (opt.preload) {
      let preloader = getElement('preloader')
      target.appendChild(preloader)
      getPreloadElement(moduleName, data)
        .then(res => {
          preloader.remove()
          target.appendChild(res)
          resolve(target)
        })
        .catch(rej => reject(rej))
    } else {
      target.appendChild(getElement(moduleName, data))
      resolve(target)
    }
  })
}

module.exports = {
  'insert': insert
}
