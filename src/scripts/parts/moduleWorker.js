const Handlebars = require('handlebars')

Handlebars.registerHelper('if_eq', function (a, b, opts) {
  if (a == b) {
    return opts.fn(this)
  } else {
    return opts.inverse(this)
  }
})

Handlebars.registerHelper('gen', function (n, block) {
  var accum = ''
  for (var i = 1; i <= n; ++i) {
    accum += block.fn(i)
  }
  return accum
})

function getElement (block, data = {}) {
  let elem = document.createElement('div')
  elem.innerHTML = Handlebars.compile(block)(data)
  return elem
}

function getPreloadElement (block, data = {}) {
  return new Promise((resolve, reject) => {
    let elem = getElement(block, data)
    let counter = elem.getElementsByTagName('img').length
    if (counter === 0) resolve(elem)

    elem.addEventListener('load', e => {
      counter -= 1
      if (counter === 0) resolve(elem)
    }, true)

    elem.addEventListener('error', e => {
      counter -= 1
      console.error('Img: ' + e.path[0].baseURI + ' not load')
      if (counter === 0) resolve(elem)
    }, true)
  })
}

function getRemElement (block, query) {
  let url = `${query}`
  return fetch(url)
    .then(res => res.json())
    .then(res => getElement(block, res))
    .catch(rej => {
      console.error(rej)
      let div = document.createElement('div')
      div.setAttribute('data-render_error', '')
      return div
    })
}

function getRemPreloadElement (block, query) {
  let url = `${query}`
  return fetch(url)
    .then(res => res.json())
    .then(res => getPreloadElement(block, res))
    .catch(rej => {
      console.error(rej)
      let div = document.createElement('div')
      div.setAttribute('data-render_error', '')
      return div
    })
}

function insert ({block, position, target, data, blockPreload, query}) {
  if (data === 404) {
    console.error('Data base query error')
    document.dispatchEvent(new Event('callError404'))
  }

  return new Promise((resolve, reject) => {
    if (query && blockPreload) {
      let elemPreload = getElement(blockPreload)
      elemPreload = addElem(elemPreload, target, position)
      getRemPreloadElement(block, data)
        .then(elem => {
          elemPreload.remove()
          elem = addElem(elem, target, position)
          resolve(elem)
        })
        .catch(rej => reject(rej))
    } else if (query) {
      getRemElement(block, data)
        .then(elem => {
          elem = addElem(elem, target, position)
          resolve(elem)
        })
        .catch(rej => reject(rej))
    } else if (blockPreload) {
      let elemPreload = getElement(blockPreload)
      elemPreload = addElem(elemPreload, target, position)
      getPreloadElement(block, data)
        .then(elem => {
          elemPreload.remove()
          elem = addElem(elem, target, position)
          resolve(elem)
        })
        .catch(rej => reject(rej))
    } else {
      let elem = getElement(block, data)
      elem = addElem(elem, target, position)
      resolve(elem)
    }
  })
}

function addElem (elem, target, position) {
  // console.log(elem.iqnnerHTML)
  let outElem = elem.firstElementChild

  if (position === 'inside') {
    target.append(...elem.childNodes)
  } else if (position === 'before') {
    target.before(...elem.childNodes)
  } else if (position === 'after') {
    target.after(...elem.childNodes)
  }

  return outElem
}

module.exports = {
  'insert': insert
}
