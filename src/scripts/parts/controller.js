// All pages can be called by dispatched one of the next events

let screenBuilder = require('./screenBuilder.js').builder

document.addEventListener('callError404', e => {
  screenBuilder.buildError404()
})

window.addEventListener('popstate', e => {
  screenBuilder.getScreen(window.location.hash ? window.location.hash.substring(1) : 'buildMainScreen')
})
