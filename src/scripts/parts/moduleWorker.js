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

  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', query)
    xhr.send()

    xhr.onload = () => {
      resolve(JSON.parse(xhr.responseText))
    }
    xhr.onerror = () => {
      reject(xhr.status)
    }
  })
}

// preloadImgs return promise which will resolved when all images in target
// block will dispached 'load' or/and 'error' events
function preloadImgs (el, blockPreload, target, position) {
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

// Inserting blocks (string handlebars templates) with some data
// into target block
function insert ({block, position, target, data, blockPreload, query, options = {}}) {
  return getData(query || null)
    .then((queryData) => {
      data = queryData || data || {}
      if (data === 404) {
        document.dispatchEvent(new CustomEvent('callError404'))
        throw new Error('Data base query error')
      }
    })
    .then(() => {
      let el = block.createElement(data, options)
      return el
    })
    .then(el => {
      return blockPreload ? preloadImgs(el, blockPreload, target, position) : el
    })
    .then(el => {
      addElem(el, target, position)
      return el
    })
    .catch(err => console.error(err))
}

function addElem (elem, target, position) {
  let outElem = elem.firstElementChild

  if (position === 'inside') {
    target.append(elem)
  } else if (position === 'before') {
    target.before(elem)
  } else if (position === 'after') {
    target.after(elem)
  }

  return outElem
}

export default insert
