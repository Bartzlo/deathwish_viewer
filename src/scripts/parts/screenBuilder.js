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
    'mainScreen',
    {menuItems: [1,2,3,4,5]},
    {query: false, preload: true}
  )
    .then(res => moduleWorker.insert(
      document.getElementById('cell-logo'),
      'logo',
      './data/images.json',
      {query: true, preload: true}
    ))
    .catch(rej => console.error(rej))
}

module.exports.buildScreen = buildScreen