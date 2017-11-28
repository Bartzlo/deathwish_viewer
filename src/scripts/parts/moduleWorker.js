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

function getData (query) {
  if (!query) return Promise.resolve(null)

  return fetch(query)
    .then(res => {
      return res.json()
    })
    .catch(err => {
      console.error(err)
      return null
    })
}

function preload (el, blockPreload, target, position) {
  let elemPreload = getElement(blockPreload)
  elemPreload = addElem(elemPreload, target, position)

  return new Promise((resolve, reject) => {
    let counter = el.getElementsByTagName('img').length
    if (counter === 0) {
      elemPreload.remove()
      resolve(el)
    }

    el.addEventListener('load', e => {
      counter -= 1
      if (counter === 0) {
        elemPreload.remove()
        resolve(el)
      }
    }, true)

    el.addEventListener('error', e => {
      counter -= 1
      console.error('Img: ' + e.path[0].baseURI + ' not load')
      if (counter === 0) {
        elemPreload.remove()
        resolve(el)
      }
    }, true)
  })
}

function insert ({block, position, target, data, blockPreload, query}) {
  return getData(query || null)
    .then((queryData) => {
      data = queryData || data || {}
      if (data === 404) {
        document.dispatchEvent(new Event('callError404'))
        throw new Error('Data base query error')
      }
    })
    .then(() => {
      let el = getElement(block, data)
      return el
    })
    .then(el => {
      return blockPreload ? preload(el, blockPreload, target, position) : el
    })
    .then(el => {
      el = addElem(el, target, position)
      return el
    })
    .catch(err => console.error(err))
}

function addElem (elem, target, position) {
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
