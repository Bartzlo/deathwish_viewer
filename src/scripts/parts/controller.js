// All pages can be called by dispatched one of the next events

import screenBuilder from './screenBuilder.js'

function init () {
  document.addEventListener('callError404', e => {
    screenBuilder.buildError404()
  })

  window.addEventListener('popstate', e => {
    screenBuilder.getScreen(window.location.hash ? window.location.hash.substring(1) : 'buildMainScreen')
  })
}

export default init
