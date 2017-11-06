let screenBuilder = require('./screenBuilder.js').builder

document.addEventListener('callPartsVeiwerScreen', e => {
  screenBuilder.buildPartsViewer([e.detail.bookName, e.detail.issueName])
})

document.addEventListener('callMainScreen', e => {
  screenBuilder.buildMainScreen([])
})

document.addEventListener('callMainVeiwer', e => {
  screenBuilder.buildMainVeiwer([e.detail.bookName, e.detail.issueName, e.detail.number])
})

window.addEventListener('popstate', e => {
  console.log('pop')
  screenBuilder.getScreen(window.location.hash ? window.location.hash.substring(1) : 'buildMainScreen')
})
