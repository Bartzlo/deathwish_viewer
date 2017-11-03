const moduleWorker = require('./moduleWorker.js')
let content = document.getElementById('content')

function buildScreen(url) {
  // if (url == 'mainScreen') ...
  buildMainScreen()
}

function buildMainScreen() {
  content.innerHTML = ''

  moduleWorker.insert(
    content, 
    'main-screen',
    {},
    {query: false, preload: false}
  )
    .catch(rej => console.error(rej))
}

module.exports.buildScreen = buildScreen