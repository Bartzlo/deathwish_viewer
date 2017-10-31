const screenBuilder = require('./screenBuilder.js')

function init () {
  screenBuilder.createMainScreen()

  document.addEventListener('callPageSelectScreen', e => {
    screenBuilder.createPageSelectScreen(e.detail.url, e.detail.count);
  })
}

module.exports.init = init